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

    return {
        readings,
        loadReadings,
    };
});
