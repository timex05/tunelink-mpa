$(function () {
    $('#loginform').on('submit', async function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        const token = await grecaptcha.execute("6Lefwy4sAAAAAAG0fG08P3h5o5hg83BBZMdat-cZ", {
          action: "reset_password"
        });


        const redirect = getUrlParam("r");

        $.ajax({
            url: backendDomain + '/api/user/auth',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ credentials: { email: email, password: password }, captchaToken: token, website_url: frontendDomain }),
            success: function (data) {
                setToken(data.token);
                window.location.href = frontendDomain + (redirect ? "/" + redirect : '');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
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
        data: JSON.stringify({ googleToken: idToken, website_url: frontendDomain }),
        success: function (data) {
            setToken(data.token);
            window.location.href = frontendDomain + "/" + (redirect ? redirect : '');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
        }
    });
}