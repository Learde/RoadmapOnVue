import { makeRequest } from "..";

export const addAttachment = ({ nodeId, data }) => {
    return makeRequest({
        url: "/roadmaps_module/attachment/",
        method: "POST",
        data: {
            node_id: nodeId,
            url: data,
        },
    });
};

export const deleteAttachment = ({ id }) => {
    return makeRequest({
        url: `/roadmaps_module/attachment/${id}/`,
        method: "DELETE",
    });
};

export const getAttachments = () => {
    return makeRequest({
        url: `/roadmaps_module/attachment/`,
        method: "GET",
    });
};
