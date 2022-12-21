import { makeRequest } from "..";

const getTopic = ({ id }) => {
    return makeRequest({
        url: `/roadmaps_module/topic/${id}/`,
        method: "GET",
    });
};

export { getTopic };
