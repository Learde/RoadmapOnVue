import { makeRequest } from "..";

const addNode = ({ title, description, topicId, parentId = null }) => {
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

export { addNode };
