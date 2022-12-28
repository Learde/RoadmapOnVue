import { ref } from "vue";
import { defineStore } from "pinia";
import { getReads } from "@api";

export const useReadingsStore = defineStore("readings", () => {
    const readings = ref(null);
    async function loadReadings() {
        const readingsData = (await getReads()).data;
        if (readingsData) {
            readings.value = readingsData;
        }
    }

    function includesTopic(topicId) {
        if (!readings.value) return;

        return readings.value.find((reading) => +reading.topic.id === +topicId);
    }

    return {
        readings,
        loadReadings,
        includesTopic,
    };
});
