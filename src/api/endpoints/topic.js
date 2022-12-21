import { makeRequest } from "..";

export const addTopic = ({ title, description }) => {
    return makeRequest({
        url: "/roadmaps_module/topic/",
        method: "POST",
        data: {
            title,
            description,
        },
    });
};

export const deleteTopic = ({ id }) => {
    return makeRequest({
        url: `/roadmaps_module/topic/${id}/`,
        method: "DELETE",
    });
};

export const editTopic = ({ id, title, description }) => {
    return makeRequest({
        url: `/roadmaps_module/topic/${id}/`,
        method: "PUT",
        data: {
            title,
            description,
        },
    });
};

export const getTopic = ({ id }) => {
    return makeRequest({
        url: `/roadmaps_module/topic/${id}/`,
        method: "GET",
    });
};

export const getTopics = () => {
    return makeRequest({
        url: `/roadmaps_module/topic/`,
        method: "GET",
    });
};
