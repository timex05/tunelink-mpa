$(function () {

    const email = getUrlParam('email');
    const token = getUrlParam('token');
    if(!token || !email){
        window.location.href = frontendDomain + "/hompage.html";
        return;
    }

    $('#emailtitle').text(`Reset Password for ${email}`);

    $('#resetform').on('submit', function (e) {
        e.preventDefault();
        const password = $('#password').val();


        

        $.ajax({
            url: `${backendDomain}/api/user/auth/reset`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ token: token, password: password}),
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