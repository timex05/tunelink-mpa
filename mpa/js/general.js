const backendDomain = "http://localhost:5000";
const frontendDomain = "D:\\Timo\\moremusic\\mpa"

function verifyToken(redirect, newAuthentication){
    if(!isTokenValid()){
        removeToken();
        if(newAuthentication){
            window.location.href = frontendDomain + "/auth/login.html" + (redirect ? "?r=" + redirect : "");
        } else {
            window.location.href = frontendDomain + "/" + redirect;
        }
        
    }
    
}

function isTokenValid(){
    if(!localStorage.getItem('token') || !localStorage.getItem('expiresAt')) return false;
    if(new Date().getTime() > new Date(localStorage.getItem('expiresAt'))) return false;

    return true;
}

function setToken(token){
    removeToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + token.validInMinutes * 60000);
    localStorage.setItem('token', token.value);
    localStorage.setItem('expiresAt', expiresAt);
}

function getToken(){
    return localStorage.getItem('token');
}

function removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
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