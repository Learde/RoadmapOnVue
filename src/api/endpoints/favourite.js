import { makeRequest } from "..";

export const addFavourite = ({ userId, topicId }) => {
    return makeRequest({
        url: "/user_module/user_favourite/",
        method: "POST",
        data: {
            user_id: userId,
            topic_id: topicId,
        },
    });
};

export const deleteFavourite = ({ id }) => {
    return makeRequest({
        url: `/user_module/user_favourite/${id}/`,
        method: "DELETE",
    });
};

export const getFavourites = () => {
    return makeRequest({
        url: `/user_module/user_favourite/`,
        method: "GET",
    });
};
