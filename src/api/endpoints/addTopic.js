import { makeRequest } from "..";

const addTopic = ({ title, description }) => {
    return makeRequest({
        url: "/roadmaps_module/topic/",
        method: "POST",
        data: {
            title,
            description,
        },
    });
};

export { addTopic };
