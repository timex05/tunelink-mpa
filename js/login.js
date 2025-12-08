$(function () {
    $('#loginform').on('submit', function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();


        const redirect = getUrlParam("r");

        $.ajax({
            url: backendDomain + '/api/user/auth',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ credentials: { email: email, password: password } }),
            success: function (data) {
                setToken(data.token);
                window.location.href = frontendDomain + "/" + (redirect ? redirect : '');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });
});

function onGoogleLogin(response) {
    const idToken = response.credential;
    const redirect = getUrlParam("r");
    $.ajax({
        url: backendDomain + '/api/user/auth/google',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ googleToken: idToken }),
        success: function (data) {
            setToken(data.token);
            window.location.href = frontendDomain + "/" + (redirect ? redirect : '');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
}