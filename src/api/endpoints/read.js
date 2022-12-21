import { makeRequest } from "..";

export const addRead = ({ userId, topicId }) => {
    return makeRequest({
        url: "/user_module/user_read/",
        method: "POST",
        data: {
            user_id: userId,
            topic_id: topicId,
        },
    });
};

export const deleteRead = ({ id }) => {
    return makeRequest({
        url: `/user_module/user_read/${id}/`,
        method: "DELETE",
    });
};

export const getReads = () => {
    return makeRequest({
        url: `/user_module/user_read/`,
        method: "GET",
    });
};
