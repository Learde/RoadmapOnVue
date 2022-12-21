import { makeRequest } from "..";

const doLogin = ({ email, password }) => {
    return makeRequest({
        url: "/auth/login/",
        method: "POST",
        data: {
            email,
            password,
        },
    });
};

export { doLogin };
