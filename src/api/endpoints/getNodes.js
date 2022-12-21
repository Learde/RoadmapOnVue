import { makeRequest } from "..";

const getNodes = ({ topicId }) => {
    return makeRequest({
        url: `/roadmaps_module/road_node/`,
        method: "GET",
        params: {
            topic_id: topicId,
        },
    });
};

export { getNodes };
