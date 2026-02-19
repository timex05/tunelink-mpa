$(function () {
    const token = getUrlParam('token');
    const email = getUrlParam('email');
    if(!token || !email){
        window.location.href = frontendDomain;
        return;
    }

    $.ajax({
        url: backendDomain + '/api/user/confirm',
        type: 'put',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ website_url: frontendDomain, token: token }),
        success: function (data) {
            alert(data.message);
            window.location.href = frontendDomain + '/auth/login.html';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError + '\n Message: ' + xhr.responseJSON.message);
            window.location.href = frontendDomain;
        }
    });
});