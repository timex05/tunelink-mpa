$(function () {
    $('#createtree').on('submit', function () {
        const tree = {
            title: $('#treeTitle').val(),
            interpret: $('#interpret').val(),
            album: $('#album').val(),
            description: $('#description').val(),
            cover: $('#cover').val(),
            isPublic: $('#public').prop('checked'),
            releaseDate: $('#releaseDate').val(),
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
            type: 'post',
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