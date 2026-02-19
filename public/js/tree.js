let liked = false;
let treeId = undefined;
$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    treeId = urlParams.get("id");
    if(!treeId || treeId == '') {
        window.location.href = frontendDomain;
        return;
    }

    $.ajax({
        url: backendDomain + `/api/tree/${treeId}?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            const tree = data.tree;
            const owner = data.tree.owner;
            const urls = data.tree.urls;


            console.log(data);
            $("#tree-title").text(tree.title);
            $("#tree-subtitle").text(tree.interpret);
            $("#tree-description").text(tree.description);
            $("#tree-clicks-release").text(tree.analytics.clicks + " Clicks • Released " + timeAgo(tree.releaseDate));
            
            if(tree.analytics.likes.liked){
                $("#tree-like").html(tree.analytics.likes.count + ' <i class="bi bi-heart-fill"></i>');
                liked = true;
            } else {
                liked = false;
                $("#tree-like").html(tree.analytics.likes.count + ' <i class="bi bi-heart"></i>');
            }
            $("#tree-comment").html(tree.analytics.comments + ' <i class="bi bi-chat"></i>');
            $("#tree-owner-link").attr('href', `../data/user.html?id=${owner.id}`);

            $("#tree-owner-img").attr('src', `${getImagePathFromUser(owner, "64x64")}`);
            $("#tree-owner").text(owner.name);

            $('#linkbox').empty();
            if(urls.spotify && urls.spotify != ""){
                $('#linkbox').append(getUrlDiv('spotify.png', urls.spotify));
            } 

            if(urls.youtube && urls.youtube != ""){
                $('#linkbox').append(getUrlDiv('youtube.png', urls.youtube));
            } 

            if(urls.applemusic && urls.applemusic != ""){
                $('#linkbox').append(getUrlDiv('applemusic.png', urls.applemusic));

            } 

            if(urls.amazonmusic && urls.amazonmusic != ""){
                $('#linkbox').append(getUrlDiv('amazonmusic.png', urls.amazonmusic));

            } 

            if(urls.soundcloud && urls.soundcloud != ""){
                $('#linkbox').append(getUrlDiv('soundcloud.svg', urls.soundcloud));

            }

            if(urls.youtubemusic && urls.youtubemusic != ""){
                $('#linkbox').append(getUrlDiv('ytmusic.svg', urls.youtubemusic));

            } 

            $('#content-placeholder').remove();
            $('#content').removeClass('d-none');
            
            const imageUrl = tree.cover // replace with your URL or null
            const bgDiv = document.getElementById('header-bg');

            if (imageUrl) {
              bgDiv.style.backgroundImage = `url('${imageUrl}')`;
            } else {
              bgDiv.style.display = 'none'; // kein Bild, nur bg-light
              document.getElementById('main-header').classList.add('bg-light');
            }

            if(tree.ytId && tree.ytId != ""){
                loadPlayer(tree.ytId);
            } else {
                $('#video_sec').remove();
            }


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
        }
    });

    $.ajax({
        url: backendDomain + `/api/tree/${treeId}/comments?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            const box = $("#comment-box")
            console.log(data);
            data.commentlist.forEach(comment => {
                if(comment.permissions.canDelete){
                    const $html = $(`
                        <div class="card mb-2">
                            <div class="card-body py-2">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="d-flex align-items-start">
                                         <a href="user.html?id=${comment.owner.id}">
                                            <div class="rounded-circle overflow-hidden me-2 mr-2 square-40">
                                                <img src="${getImagePathFromUser(comment.owner, "40x40")}" alt="User" class="img-fluid object-fit-cover" width="100%" height="100%">
                                            </div>
                                         </a>
                                        <div>
                                            <strong><a href="user.html?id=${comment.owner.id}">You</a></strong>
                                            <p class="mb-0 text-muted small">${comment.message}</p>
                                        </div>
                                    </div>
                                    <button id="comment-${comment.id}" class="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    `);

                    box.append($html)
                    $(`#comment-${comment.id}`).on('click', function () {
                        const id = comment.id;
                        deleteComment(id);
                    });
                } else {
                    const $html = $(`
                        <div class="card mb-2">
                            <div class="card-body py-2">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="d-flex align-items-start">
                                         <a href="user.html?id=${comment.owner.id}">
                                            <div class="rounded-circle overflow-hidden me-2 mr-2 square-40">
                                                <img src="${getImagePathFromUser(comment.owner, "40x40")}" alt="User" class="img-fluid object-fit-cover" width="100%" height="100%">
                                            </div>
                                         </a>
                                        <div>
                                            <strong><a href="user.html?id=${comment.owner.id}">${comment.owner.name}</a></strong>
                                            <p class="mb-0 text-muted small">${comment.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    box.append($html)
                }
            });
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
        }
    });
    



    $('#tree-like').on('click', function () {
        verifyToken(`data/tree.html?id=${treeId}`, true);
        $.ajax({
            url: backendDomain + `/api/tree/${treeId}/likes?${getTokenForUrl()}`,
            type: `${(liked ? "delete" : "put")}`,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ token: getTokenString() }),
            success: function (data) {
                alert(data.message);
                window.location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
            }
        });
    });

    $('#comment-submit').on('click', function () {
        if(!verifyToken(`data/tree.html?id=${treeId}`, true)){ return; }
        const message = $("#commentInput").val();
        if(!message || message == ""){
            alert("Invalid Message.");
            return;
        }
        $.ajax({
            url: backendDomain + `/api/tree/${treeId}/comments?${getTokenForUrl()}`,
            type: `put`,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ token: getTokenString(), message: message }),
            success: function (data) {
                alert(data.message);
                window.location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
            }
        });
    });

    $('#copylink').on('click', function () {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(function() {
            alert('Link copied to clipboard!');
        });
    });

});

function deleteComment(id){
    verifyToken(`data/tree.html?id=${treeId}`, true);
    $.ajax({
        url: backendDomain + `/api/tree/${treeId}/comments/${id}?${getTokenForUrl()}`,
        type: `delete`,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ token: getTokenString(), commentId: id }),
        success: function (data) {
            console.log(data);
            alert(data.message);
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError  + '\n Message: ' + xhr.responseJSON.message);
        }
    });
}

var player;
var youtubeId = '';
function loadPlayer(_youtubeId){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    youtubeId = _youtubeId;
}
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: youtubeId,
    playerVars: {
      'playsinline': 1
    }
  });
}

function getUrlDiv(banner, url){
  return `<div class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <img src="https://tunelink-static.vercel.app/assets/images/platform/banner/${banner}" alt="" class="me-2" height="40px">
    </div>
    <a href="${url}" class="btn btn-primary btn-md ps-5 pe-5" target="_blank">
      <i class="bi bi-play d-none d-md-inline"></i> Play
    </a>
  </div>`;
}