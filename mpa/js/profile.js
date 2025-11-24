$(function() {
    verifyToken("profile.html", true);
    $.ajax({
        url: backendDomain + `/api/user/me?token=${getToken()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const imgPath = (data.user.profileImg.url ? data.user.profileImg.url : frontendDomain + "/" + data.user.profileImg.default + "_round.png");
            // $('#user-image').attr('src', imgPath);
            $('#user-name').text(data.user.name);
            $('#user-description').text(data.user.description);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $.ajax({
        url: backendDomain + `/api/tree?token=${getToken()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#my-tree-box');
            data.treelist.forEach(tree => {
                const cardHtml = `
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${tree.title}</h5>
                                <div class="btn-group w-100" role="group">
                                    <a href="../data/tree.html?id=${tree.id}" target="_blank" class="btn btn-sm btn-outline-primary">View</a>
                                    <a href="../data/editTree.html?id=${tree.id}" class="btn btn-sm btn-outline-secondary">Edit</a>
                                    <a href="../data/deleteTree.html?id=${tree.id}" class="btn btn-sm btn-outline-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                $container.append(cardHtml);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });
    
    $.ajax({
        url: backendDomain + `/api/likes/tree?token=${getToken()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#like-box');
            data.treelist.forEach(tree => {
                const cardHtml = `
                    <div class="col-12 col-md-6 col-lg-4">
                        <a href="../data/tree.html?id=${tree.id}" target="_blank" class="text-decoration-none">
                            <div class="card h-100">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${tree.title}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                `;

                $container.append(cardHtml);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $.ajax({
        url: backendDomain + `/api/comments/tree?token=${getToken()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            console.log(data);
            const $container = $('#comment-box');
            data.treelist.forEach(tree => {
                const cardHtml = `
                    <div class="col-12 col-md-6 col-lg-4">
                        <a href="../data/tree.html?id=${tree.id}" target="_blank" class="text-decoration-none">
                            <div class="card h-100">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${tree.title}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                `;

                $container.append(cardHtml);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

});


