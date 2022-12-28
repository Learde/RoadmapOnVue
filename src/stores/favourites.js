import { ref } from "vue";
import { defineStore } from "pinia";
import { getFavourites } from "@api";

export const useFavouritesStore = defineStore("favourites", () => {
    const favourites = ref(null);
    async function loadFavourites() {
        const favouritesData = (await getFavourites()).data;
        if (favouritesData) {
            favourites.value = favouritesData;
        }
    }

    function includesTopic(topicId) {
        if (!favourites.value) return;

        return favourites.value.find(
            (favourite) => +favourite.topic.id === +topicId
        );
    }

    return {
        favourites,
        loadFavourites,
        includesTopic,
    };
});
