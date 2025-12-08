
let profileImg = {
    url: "",
    default: ""
}

let user = {};

function selectAvatar($label) {
    $('.avatar-label input[type="radio"]').prop('checked', false);
    const $radio = $label.find('input[type="radio"]');
    $radio.prop('checked', true)


    const avatar = $radio.prop('checked', true).val();

    if(avatar == 'male'){
        profileImg.url = undefined;
        profileImg.default = 'MALE';
    } else if(avatar == 'female'){
        profileImg.url = undefined;
        profileImg.default = 'FEMALE';
    } else {
        profileImg.url = avatar;
    }
}

function addCustomAvatar(url) {
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }

    const escapedUrl = url.replace(/"/g, '&quot;');

    const $html = $(`
        <label class="text-center cursor-pointer avatar-label">
            <input type="radio" name="avatar" value="${escapedUrl}" class="d-none" required>
            <div class="avatar-container">
                <img src="${escapedUrl}" class="avatar-img">
            </div>
        </label>
    `);

    // Fehlerbild entfernen
    $html.find('img').on('error', function () {
        $(this).closest('.avatar-label').remove();
    });

    $("#customAvatarBox").append($html);
    $("#customAvatarUrl").val("");
}

// DiceBear Avatare laden
function loadDiceBearAvatars() {
    const $box = $("#diceBearAvatarBox");
    $box.empty();

    for (let i = 0; i < 20; i++) {
        const seed = Math.floor(100000 + Math.random() * 900000);
        const url = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;

        const $html = $(`
            <label class="text-center cursor-pointer avatar-label">
                <input type="radio" name="avatar" value="${url}" class="d-none" required>
                <div class="avatar-container">
                    <img src="${url}" class="avatar-img">
                </div>
            </label>
        `);

        $box.append($html);
    }
}



$(function () {
    //verifyToken("profile.html", true);
    loadDiceBearAvatars();

    $(document).on("click", ".avatar-img", function () {
        selectAvatar($(this).closest('.avatar-label'));
    });

    $.ajax({
        url: backendDomain + `/api/user/me?${getTokenForUrl()}`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            profileImg = data.user.profileImg;
            user = data.user;
            

            if(data.user.profileImg.url){
                const html = `
                    <h6 class="text-secondary mb-3">Current Avatar</h6>
                    <div class="d-flex flex-wrap gap-4">
                        <label id="current" class="text-center cursor-pointer avatar-label">
                            <input type="radio" name="avatar" value="${data.user.profileImg.url}" class="d-none" required>
                            <div class="avatar-container">
                                <img src="${data.user.profileImg.url}"
                                     class="avatar-img">
                            </div>
                        </label>
                    </div>            
                `;
                $("#currentAvatar").html(html);
                selectAvatar($("#current"));
            } else if(data.user.profileImg.default == 'MALE'){

                selectAvatar($("#default-male"));
            } else if(data.user.profileImg.default == 'FEMALE'){
                selectAvatar($("#default-female"));
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error: ' + xhr.status + '  ' + thrownError);
        }
    });

    $('#avatarform').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: backendDomain + '/api/user/me',
            type: 'put',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ 
                token: getTokenString(),
                user: {
                    id: user.id,
                    profileImg: profileImg
                }
            }),
            success: function (data) {
                alert(data.message);
                window.location.href = frontendDomain + "/profile/editProfile.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error: ' + xhr.status + '  ' + thrownError);
            }
        });
    });
});