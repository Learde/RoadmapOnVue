import { makeRequest } from "..";

export const doLogin = ({ email, password }) => {
    return makeRequest({
        url: "/auth/login/",
        method: "POST",
        data: {
            email,
            password,
        },
    });
};

export const doRegistration = ({ email, password }) => {
    return makeRequest({
        url: "/user_module/user/",
        method: "POST",
        data: {
            email,
            password,
            role_id: 1,
        },
    });
};
