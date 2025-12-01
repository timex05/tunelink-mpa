$(function() {
    verifyToken("profile.html", true);
    $.ajax({
        url: backendDomain + `/api/user/me?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            $('#user-image').attr('src', `${getImagePathFromUser(data.user, "../")}`);
            $('#user-name').text(data.user.name);
            $('#user-description').text(data.user.description);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $.ajax({
        url: backendDomain + `/api/tree?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#my-tree-box');
            if(data.treelist.length == 0){
                $container.append(nothingBox());
            }

            data.treelist.forEach(tree => {
                $container.append(getTreeCard(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
    
    $.ajax({
        url: backendDomain + `/api/like/tree?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#like-box');
            if(data.treelist.length == 0){
                $container.append(nothingBox());
            }
            data.treelist.forEach(tree => {
                $container.append(getTreeCard(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $.ajax({
        url: backendDomain + `/api/comment/tree?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#comment-box');
            if(data.treelist.length == 0){
                $container.append(nothingBox());
            }
            data.treelist.forEach(tree => {
                $container.append(getTreeCard(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

});


