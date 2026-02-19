$(function () {
    $('#forgotform').on('submit', async function (e) {
        e.preventDefault();
        const token = await grecaptcha.execute("6Lefwy4sAAAAAAG0fG08P3h5o5hg83BBZMdat-cZ", {
          action: "reset_password"
        });

        const email = $('#email').val();


        const redirect = getUrlParam("r");

        $.ajax({
            url: `${backendDomain}/api/user/auth/forgot`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ email: email, resetUrl: `${frontendDomain}/auth/reset.html`, captchaToken: token }),
            success: function (data) {
                alert(data.message)
                window.location.href = frontendDomain + "/auth/login.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
            }
        });
    });


});