$(function () {
    $('#registerform').on('submit', function (e) {
        e.preventDefault();
        const name = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: backendDomain + '/api/user',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ user: { name: name, email: email, password: password } }),
            success: function (data) {
                alert(data.message);
                window.location.href = frontendDomain + '/auth/login.html';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });
});

function onGoogleLogin(response) {
    const idToken = response.credential;
    $.ajax({
        url: backendDomain + '/api/user/auth/google',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ googleToken: idToken }),
        success: function (data) {
            setToken(data.token);
            window.location.href = frontendDomain + "/" + 'homepage.html';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
}