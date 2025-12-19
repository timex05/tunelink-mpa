let user = {};

$(function () {
    //verifyToken("profile.html", true);


    $.ajax({
        url: backendDomain + `/api/user/me?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            $("#username").val(data.user.name);
            $("#email").val(data.user.email);
            $("#description").val(data.user.description);
            $("#newsletter").prop('checked', data.user.isNewsLetter);
            $("#profilePicturePreview").prop('src', getImagePathFromUser(data.user));
            user = data.user;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $('#editform').on('submit', function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        const username = $("#username").val();
        const description = $("#description").val();
        const isNewsLetter = $("#newsletter").val() == 'on' ? true : false;

        if(email && email != ""){
            user.email = email;
        }
        if(password && password != ""){
            user.password = password;
        }
        if(username && username != ""){
            user.name = username;
        }
        if(description && description != ""){
            user.description = description;
        }

        $.ajax({
            url: backendDomain + '/api/user/me',
            type: 'put',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ 
                token: getTokenString(),
                user: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isNewsLetter: isNewsLetter,
                    description: user.description
                }
            }),
            success: function (data) {
                alert(data.message);
                window.location.href = frontendDomain + "/profile/profile.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });
});