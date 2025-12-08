
$(function () {
    $('#logoff').click(function () {
        if(!localStorage.getItem('token')) return;
        $.ajax({
            url: backendDomain + '/api/user/auth',
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ token: getTokenString() }),
            success: function (data) {
                removeToken();
                alert(data.message);
                window.location.href = frontendDomain + '/';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });

    verifyToken("", false);

});

