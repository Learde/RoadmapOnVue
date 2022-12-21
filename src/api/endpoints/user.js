import { makeRequest } from "@api";

export const getUser = ({ id }) => {
    return makeRequest({
        url: `/roadmaps_module/road_node/${id}/`,
        method: "GET",
    });
};
