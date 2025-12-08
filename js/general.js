
// prod
const backendDomain = "http://localhost:3000";
const frontendDomain = "https://tunelink-mpa.vercel.app"


// dev
// const backendDomain = "http://localhost:3000";
// const frontendDomain = "127.0.0.1:5500";


const urlParams = new URLSearchParams(window.location.search);

function getUrlParam(key){
    return urlParams.get(key);
}

function verifyToken(redirect, newAuthentication){
    if(!isTokenValid()){
        removeToken();
        if(newAuthentication){
            window.location.href = frontendDomain + "/auth/login.html" + (redirect ? "?r=" + redirect : "");
        } else {
            window.location.href = frontendDomain + "/" + redirect;
        }
        return false;
    }
    return true;
}

function isTokenValid(){
    const token = getToken();
    if(!token) return false;
    if(new Date().getTime() > new Date(token.expiresAt)) return false;

    return true;
}

function setToken(token){
    removeToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + token.validInMinutes * 60000);
    const newToken = {
        value: token.value,
        expiresAt: expiresAt
    }
    localStorage.setItem('token', JSON.stringify(newToken));
}

function getTokenString(){
    return getToken().value;
}

function removeToken(){
    localStorage.removeItem('token');
}

function getTokenForUrl(){
    return (isTokenValid() ? "token=" + getTokenString() : "");
}

function getToken(){
    return JSON.parse(localStorage.getItem('token'));
}

function getImagePathFromUser(user, imgPrefix){
    let imgUrl = user.profileImg?.url;
    if(!imgUrl || imgUrl == ''){
        imgUrl = `${imgPrefix}images/profile-dummy/${user.profileImg.default}_round.png`;
    }
    return imgUrl;
}

$(function () {
    if(isTokenValid()){
        $(".logged").show();
        $(".nlogged").hide();
    } else {
        $(".logged").hide();
        $(".nlogged").show();
    }
});


function getTreeCard(tree, imgPrefix){
    console.log(tree);
    const cardHtml = `
    <div class="col-12 col-md-6 col-lg-4">
        <div class="card tree-card position-relative text-white overflow-hidden h-100 shadow-sm">
                
            <!-- Unscharfer Hintergrund -->
            <div class="bg-blur" 
                 style="background-image: url('${tree.cover || imgPrefix + "images/dummyTreeCover.png"}');">
            </div>
                
            <div class="card-body position-relative">
                
                <!-- User Bereich -->
                <div class="d-flex align-items-center mb-3">
                    <a href="${imgPrefix}data/user.html?id=${tree.owner.id}" class="d-flex align-items-center text-white text-decoration-none user-link">
                        <img src="${getImagePathFromUser(tree.owner, imgPrefix)}" 
                             class="rounded-circle me-2" 
                             width="40" height="40" 
                             alt="Profile">
                        <strong>${tree.owner.name}</strong>
                    </a>
                </div>
                <a href="${imgPrefix}data/tree.html?id=${tree.id}" target="_blank" class="text-reset text-decoration-none tree-link">
                <!-- Titel -->
                <h5 class="card-title">${tree.title}</h5>
                
                <!-- Interpret & Beschreibung -->
                <p class="mb-1"><strong>Interpret:</strong> ${tree.interpret}</p>
                <p class="text-light">${tree.description}</p>
                
                <!-- Icons: Likes, Comments, Clicks -->
                <div class="d-flex gap-3 mt-3">
                    <span class="d-flex align-items-center">
                        <i class="bi bi-heart-fill me-1"></i> ${tree.analytics.likes.count}
                    </span>
                    <span class="d-flex align-items-center ${tree.analytics.likes.liked ? "active" : ""}">
                        <i class="bi bi-chat-left-text-fill me-1"></i> ${tree.analytics.comments}
                    </span>
                    <span class="d-flex align-items-center">
                        <i class="bi bi-hand-index me-1"></i> ${tree.analytics.clicks}
                    </span>
                </div>

                </a>
                
                <!-- Klickbare Tree-Seite -->
                <div class="mt-3">
                    ${tree.permissions.canEdit ? 
                        `<a href="${imgPrefix}data/editTree.html?id=${tree.id}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="bi bi-pencil-fill"></i>
                        </a> ` : ""}
                    ${tree.permissions.canDelete ? 
                        `<a href="${imgPrefix}data/deleteTree.html?id=${tree.id}" target="_blank" class="btn btn-danger btn-sm">
                            <i class="bi bi-trash-fill"></i>
                        </a>
                        ` 
                        : ""}
                </div>
                
            </div>
        </div>
    </div>
    `;

    return cardHtml;
}

function nothingBox() {
    return `<p>Nothing to show here.<p/>`
}
