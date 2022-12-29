import axios from "axios";

const BASE_URL = window.BASE_URL ?? "http://127.0.0.1:3000/";
let token = null;

const httpInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
});
httpInstance.defaults.trailingSlash = true;

const setHeaders = (headers) => {
    httpInstance.defaults.headers = headers;
};

const addHeaders = (headers) => {
    httpInstance.defaults.headers = {
        ...httpInstance.defaults.headers,
        ...headers,
    };
};

const setBaseUrl = (url) => {
    httpInstance.defaults.baseURL = url;
};

const setToken = (t) => {
    token = t;
};

export default httpInstance;
export { setHeaders, addHeaders, setBaseUrl, setToken, token };
