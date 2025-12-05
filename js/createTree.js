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

    $('#spotifysonginfo').on('click', function () {

        const spotifyUrl = prompt("Enter Spotify Url: ");
        const trackId = extractSpotifyId(spotifyUrl);

        if(!trackId){
            alert('Invalid Spotify Url.')
            return;
        }


        $.ajax({
            url: backendDomain + `/api/spotify/trackinfo?trackId=${trackId}&${getTokenForUrl()}`,
            type: 'get',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                $('#treeTitle').val(data.trackInfo.title);
                $('#interpret').val(data.trackInfo.interpret);
                $('#album').val(data.trackInfo.album);
                $('#cover').val(data.trackInfo.imageUrl);
                $('#releaseDate').val(data.trackInfo.releaseDate);
                $('#spotify').val(spotifyUrl);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);

            }
        });
    });
});

function extractSpotifyId(urlString) {
  const url = new URL(urlString);             
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
}