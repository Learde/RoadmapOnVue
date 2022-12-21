import { makeRequest } from "@api";

export const addNode = ({ title, description, topicId, parentId = null }) => {
    return makeRequest({
        url: "/roadmaps_module/road_node/",
        method: "POST",
        data: {
            title,
            description,
            topic_id: topicId,
            parent_id: parentId,
        },
    });
};

export const deleteNode = ({ nodeId }) => {
    return makeRequest({
        url: `/roadmaps_module/road_node/${nodeId}/`,
        method: "DELETE",
    });
};

export const getNodes = ({ topicId }) => {
    return makeRequest({
        url: `/roadmaps_module/road_node/`,
        method: "GET",
        params: {
            topic_id: topicId,
        },
    });
};
