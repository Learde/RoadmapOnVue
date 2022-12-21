import httpInstance from "./config";
import { token } from "./config";

const makeRequest = ({
    url = "/",
    method = "get",
    params = {},
    data = {},
    headers = {},
}) => {
    if (token) headers.Authorization = token;

    return httpInstance.request({
        url,
        method,
        headers,
        params,
        data,
    });
};

export default makeRequest;
