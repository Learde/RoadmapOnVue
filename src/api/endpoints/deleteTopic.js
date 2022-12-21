import { makeRequest } from "..";

const deleteTopic = ({ id }) => {
    return makeRequest({
        url: `/roadmaps_module/topic/${id}/`,
        method: "DELETE",
    });
};

export { deleteTopic };
