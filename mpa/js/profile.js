$(function() {
    verifyToken("profile.html", true);
    $.ajax({
        url: backendDomain + `/api/user/me?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            $('#user-image').attr('src', `../${getImagePathFromUser(data.user)}`);
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
            data.treelist.forEach(tree => {
                $container.append(getTreeCardWithEdit(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
    
    $.ajax({
        url: backendDomain + `/api/likes/tree?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#like-box');
            data.treelist.forEach(tree => {
                $container.append(getTreeCard(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $.ajax({
        url: backendDomain + `/api/comments/tree?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#comment-box');
            data.treelist.forEach(tree => {
                $container.append(getTreeCard(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

});


