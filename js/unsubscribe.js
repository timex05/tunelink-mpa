$(function(){
    const email = getUrlParam("email");
    if(!email){
        window.location.href = frontendDomain;
        return;
    }

    $("#title").text(`Unsubscribe ${email} from TuneLink Newsletter`);
    $("#unsubscribe").click(function(){
        $.ajax({
            url: backendDomain + '/api/newsletter/',
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ email: email }),
            success: function (data) {
                alert(data.message);
                window.location.href = frontendDomain;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
                window.location.href = frontendDomain;
            }

        });
    });



});