$(function() {
    verifyToken("profile/profile.html", true);
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
            $('#profilearea').removeClass('d-none');
            $('#profilearea').addClass('d-flex');
            $('#profilearea-skeleton').removeClass('d-flex');
            $('#profilearea-skeleton').addClass('d-none');
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
            $container.empty();
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
            $container.empty();
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
            $container.empty();
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


