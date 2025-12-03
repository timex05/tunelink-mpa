$(function () {
    $('#forgotform').on('submit', function (e) {
        e.preventDefault();
        const email = $('#email').val();


        const redirect = getUrlParam("r");

        $.ajax({
            url: `${backendDomain}/api/user/auth/forgot`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ email: email, resetUrl: `${frontendDomain}/auth/reset.html`}),
            success: function (data) {
                alert(data.message)
                window.location.href = frontendDomain + "/auth/login.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });


});