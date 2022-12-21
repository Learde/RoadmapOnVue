import { makeRequest } from "..";

const doRegistration = ({ email, password }) => {
    return makeRequest({
        url: "/user_module/user/",
        method: "POST",
        data: {
            email,
            password,
        },
    });
};

export { doRegistration };
