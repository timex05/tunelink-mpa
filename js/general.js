
// prod
// const backendDomain = "https://tunelink-55a280dd7187.herokuapp.com";
// const frontendDomain = "https://tunelink-mpa.vercel.app"


// dev
const backendDomain = "http://localhost:3000";
const frontendDomain = "http://127.0.0.1:5500";


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

function getImagePathFromUser(user, size){
    size = size || "";
    let imgUrl = user.profileImg?.url;
    if(!imgUrl || imgUrl == ''){
        if(user.profileImg.default.toLowerCase() == 'male'){
            imgUrl = `https://tunelink-static.vercel.app/assets/images/avatars/male/male_round${size == "" ? "" : "_" + size}.png`;
        } else {
            imgUrl = `https://tunelink-static.vercel.app/assets/images/avatars/female/female_round${size == "" ? "" : "_" + size}.png`;
        }
        
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

function getTreeCardSkeleton(){
    return `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card tree-card position-relative overflow-hidden h-100 shadow-sm">  
                <div class="card-body position-relative placeholder-wave">
                    <div class="d-flex align-items-center mb-3">
                        <span class="rounded-circle placeholder me-2 square-40"></span>
                        <span class="placeholder col-5"></span>
                    </div>
                    <h5 class="card-title">
                        <span class="placeholder col-7"></span>
                    </h5>
                    <p class="mb-1">
                        <span class="placeholder col-4"></span>
                    </p>
                    <p>
                        <span class="placeholder col-10"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                    <div class="d-flex gap-3 mt-3">
                        <span class="d-flex align-items-center">
                            <span class="placeholder col-2"></span>
                        </span>
                        <span class="d-flex align-items-center">
                            <span class="placeholder col-2"></span>
                        </span>
                        <span class="d-flex align-items-center">
                            <span class="placeholder col-2"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function getTreeCard(tree){
    console.log(tree);
    const cardHtml = `
    <div class="col-12 col-md-4 col-lg-3">
        <div class="card tree-card position-relative text-white overflow-hidden h-100 shadow-sm">
                
            <!-- Unscharfer Hintergrund -->
            <div class="bg-blur" 
                 style="background-image: url('${tree.cover || "https://tunelink-static.vercel.app/assets/images/tunelink/logo/dummyTreeCover.png"}');">
            </div>
                
            <div class="card-body position-relative">
                
                <!-- User Bereich -->
                <div class="d-flex align-items-center mb-3">
                    <a href="/data/user.html?id=${tree.owner.id}" class="d-flex align-items-center text-white text-decoration-none user-link">
                        <img src="${getImagePathFromUser(tree.owner, "40x40")}" 
                             class="rounded-circle me-2" 
                             width="40" height="40" 
                             alt="Profile">
                        <strong>${tree.owner.name}</strong>
                    </a>
                </div>
                <a href="/data/tree.html?id=${tree.id}" class="text-reset text-decoration-none tree-link">
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
                        `<a href="/data/editTree.html?id=${tree.id}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="bi bi-pencil-fill"></i>
                        </a> ` : ""}
                    ${tree.permissions.canDelete ? 
                        `<a href="/data/deleteTree.html?id=${tree.id}" target="_blank" class="btn btn-danger btn-sm">
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


function formatDate(timestamp) {
    // 1. In JS-Datei konvertieren
    const date = new Date(timestamp); // erzeugt Date-Objekt in lokaler Zeit

    // 2. Für datetime-local formatieren
    const pad = (n) => n.toString().padStart(2, "0");

    const localDatetime = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    console.log(localDatetime); // "2025-12-08T10:45"

    return localDatetime;
}

// Zeit seit dem Datum in lesbarem Format
function timeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp); // automatisch in lokale Zeit konvertiert
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');

    const days = Math.floor(hours / 24);
    if (days < 365) return days + (days === 1 ? ' day ago' : ' days ago');

    const years = Math.floor(days / 365);
    return years + (years === 1 ? ' year ago' : ' years ago');
}