import { makeRequest } from "..";

const editTopic = ({ id, title, description }) => {
    return makeRequest({
        url: `/roadmaps_module/topic/${id}/`,
        method: "PUT",
        data: {
            title,
            description,
        },
    });
};

export { editTopic };
