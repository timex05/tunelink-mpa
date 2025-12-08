let liked = false;
let treeId = undefined;
$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    treeId = urlParams.get("id");
    if(!treeId || treeId == '') {
        window.location.href = frontendDomain + '/';
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
            $("#tree-like").html(tree.analytics.likes.count + ' <i class="bi bi-heart"></i>');
            if(tree.analytics.likes.liked){
                $("#tree-like").addClass('active');
                liked = true;
            } else {
                liked = false;
            }
            $("#tree-comment").html(tree.analytics.comments + ' <i class="bi bi-chat"></i>');
            $("#tree-owner-link").attr('href', `../data/user.html?id=${owner.id}`);

            $("#tree-owner-img").attr('src', `${getImagePathFromUser(owner, "../")}`);
            $("#tree-owner").text(owner.name);

            if(!urls.spotify || urls.spotify == ""){
                $("#spotify").hide();
            } else {
                $("#spotify").attr('href', urls.spotify);
            }

            if(!urls.youtube || urls.youtube == ""){
                $("#youtube").hide();
            } else {
                $("#youtube").attr('href', urls.youtube);
            }

            if(!urls.applemusic || urls.applemusic == ""){
                $("#applemusic").hide();
            } else {
                $("#applemusic").attr('href', urls.applemusic);
            }

            if(!urls.amazonmusic || urls.amazonmusic == ""){
                $("#amazonmusic").hide();
            } else {
                $("#amazonmusic").attr('href', urls.amazonmusic);
            }

            if(!urls.soundcloud || urls.soundcloud == ""){
                $("#soundcloud").hide();
            } else {
                $("#soundcloud").attr('href', urls.soundcloud);
            }

            if(!urls.youtubemusic || urls.youtubemusic == ""){
                $("#youtubemusic").hide();
            } else {
                $("#youtubemusic").attr('href', urls.youtubemusic);
            }
            
            


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
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
                                            <div class="rounded-circle overflow-hidden me-2 mr-2" style="width:40px; height:40px;">
                                                <img src="${getImagePathFromUser(comment.owner, "../")}" alt="User" class="img-fluid" style="width:100%; height:100%; object-fit:cover;">
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
                                            <div class="rounded-circle overflow-hidden me-2 mr-2" style="width:40px; height:40px;">
                                                <img src="${getImagePathFromUser(comment.owner, "../")}" alt="User" class="img-fluid" style="width:100%; height:100%; object-fit:cover;">
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
            alert('Error: ' + xhr.status + '  ' + thrownError);
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
                alert('Error: ' + xhr.status + '  ' + thrownError);
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
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
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
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
}