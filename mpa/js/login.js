$(function () {
    $('#loginform').on('submit', function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("r");

        $.ajax({
            url: backendDomain + '/api/user/auth',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ credentials: { email: email, password: password } }),
            success: function (data) {
                setToken(data.token);
                window.location.href = frontendDomain + "/" + (redirect ? redirect : 'homepage.html');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });
});