import { makeRequest } from "@api";

export const addTopicRate = ({ topicId, comment, rate }) => {
    return makeRequest({
        url: "/rates_module/topic_rate/",
        method: "POST",
        data: {
            topic_id: topicId,
            comment,
            rate,
        },
    });
};
