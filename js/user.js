$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    if(!userId || userId == '') {
        window.location.href = frontendDomain + '/';
        return;
    }

    $.ajax({
        url: backendDomain + `/api/user/${userId}?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            $('#user-img').attr('src', `${getImagePathFromUser(data.user, "../")}`);
            $('#user-name').text(data.user.name);
            $('#user-description').text(data.user.description);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $.ajax({
        url: backendDomain + `/api/user/${userId}/tree?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            const $box = $("#treebox");

            console.log(data);
            data.treelist.forEach(tree => {
                $box.append(getTreeCard(tree, "../"));
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
});