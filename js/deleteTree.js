$(function () {
    const treeId = getUrlParam("id");
    if(!treeId || treeId == ""){
        window.location.href = "../index.html";
    }
    verifyToken(`data/deleteTree.html?id=${treeId}`, true);

    $('#delete').on('click', function () {
        $.ajax({
        url: backendDomain + `/api/tree/${treeId}`,
        type: 'delete',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ token: getTokenString(), id: treeId}),
        success: function (data) {
            alert(data.message);
            console.log(data);
            window.location.href = "../profile/profile.html";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
            window.location.href = "../index.html";
        }
    });
    });

});