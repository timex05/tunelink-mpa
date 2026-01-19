$(function () {
    const treeId = getUrlParam("id");
    if(!treeId || treeId == ""){
        window.location.href = "/";
    }
    verifyToken(`data/editTree.html?id=${treeId}`, true);
    $.ajax({
        url: backendDomain + `/api/tree/${treeId}/edit?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            const tree = data.tree;
            const urls = data.tree.urls;

            console.log(data);
            $('#treeTitle').val(tree.title);
            $('#interpret').val(tree.interpret);
            $('#album').val(tree.album);
            $('#description').val(tree.description);
            $('#cover').val(tree.cover);
            $('#public').prop('checked', tree.isPublic);
            $('#releaseDate').val(formatDate(tree.releaseDate));
            $('#spotify').val(urls.spotify);
            $('#youtube').val(urls.youtube);
            $('#applemusic').val(urls.applemusic);
            $('#amazonmusic').val(urls.amazonmusic);
            $('#soundcloud').val(urls.soundcloud);
            $('#youtubemusic').val(urls.youtubemusic);
            $('#youtubeId').val(tree.ytId);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
            window.location.href = "/";
        }
    });

    $('#editform').on('submit', function () {
        const tree = {
            id: treeId,
            title: $('#treeTitle').val(),
            interpret: $('#interpret').val(),
            album: $('#album').val(),
            description: $('#description').val(),
            cover: $('#cover').val(),
            isPublic: $('#public').prop('checked'),
            releaseDate: new Date($('#releaseDate').val()).toISOString(),
            urls: {
                spotify: $('#spotify').val(),
                youtube: $('#youtube').val(),
                applemusic: $('#applemusic').val(),
                amazonmusic: $('#amazonmusic').val(),
                soundcloud: $('#soundcloud').val(),
                youtubemusic: $('#youtubemusic').val()
            },
            ytId: $('#youtubeId').val()

        }
        $.ajax({
            url: backendDomain + `/api/tree/${treeId}`,
            type: 'put',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                token: getTokenString(),
                tree: tree
            }),
            success: function (data) {
                alert(data.message);
                console.log(data);
                window.location.href = "../profile/profile.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });


});

