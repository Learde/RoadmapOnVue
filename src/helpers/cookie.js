export const getCookie = function (name) {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) return match[2];
};
export const setCookie = function (name, value, expire) {
    let date = new Date(Date.now() + expire);
    date = date.toUTCString();
    const domain = window.location.hostname;
    document.cookie =
        name +
        "=" +
        value +
        "; path=/; expires=" +
        date +
        "; domain=." +
        domain;
};
export const isAuth = function () {
    const jwt = getCookie("jwt");
    return jwt !== undefined && jwt !== null;
};
