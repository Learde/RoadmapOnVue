import { makeRequest } from "@api";

export const getUserById = ({ id }) => {
    return makeRequest({
        url: `/user_module/user/${id}/`,
        method: "GET",
    });
};

export const getUser = () => {
    return makeRequest({
        url: `/user_module/user/me/`,
        method: "GET",
    });
};

export const getUsers = () => {
    return makeRequest({
        url: `/user_module/user/`,
        method: "GET",
    });
};
