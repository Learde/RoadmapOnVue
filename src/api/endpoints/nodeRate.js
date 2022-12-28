import { makeRequest } from "@api";

export const addNodeRate = ({ nodeId, comment, rate }) => {
    return makeRequest({
        url: "/rates_module/node_rate/",
        method: "POST",
        data: {
            node_id: nodeId,
            comment,
            rate,
        },
    });
};
