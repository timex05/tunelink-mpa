$(function () {
    $('#registerform').on('submit', async function (e) {
        e.preventDefault();
        const name = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        const token = await grecaptcha.execute("6Lefwy4sAAAAAAG0fG08P3h5o5hg83BBZMdat-cZ", {
          action: "reset_password"
        });

        $.ajax({
            url: backendDomain + '/api/user',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ captchaToken: token, user: { name: name, email: email, password: password }, website_url: frontendDomain, confirm_url: frontendDomain + '/auth/confirm.html' }),
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

async function onGoogleLogin(response) {
    const idToken = response.credential;
    const token = await grecaptcha.execute("6Lefwy4sAAAAAAG0fG08P3h5o5hg83BBZMdat-cZ", {
      action: "reset_password"
    });
    $.ajax({
        url: backendDomain + '/api/user/auth/google',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ googleToken: idToken, website_url: frontendDomain, captchaToken: token }),
        success: function (data) {
            setToken(data.token);
            window.location.href = frontendDomain + "/" + '';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
}