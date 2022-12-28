import { ref } from "vue";
import { defineStore } from "pinia";
import { getCookie, isAuth } from "@helpers";
import { setToken } from "@api";
import { useUserStore } from "@stores";
import { useFavouritesStore } from "@stores/favourites";
import { useReadingsStore } from "@stores/readings";

export const useGeneralStore = defineStore("general", () => {
    const isAuthenticated = ref(isAuth());
    function toggleAuthenticatedStatus(value) {
        isAuthenticated.value = value;
    }

    function checkAuthenticatedStatus() {
        isAuthenticated.value = isAuth();

        if (isAuthenticated.value) {
            setToken(getCookie("jwt"));

            useUserStore().loadUser();
            useFavouritesStore().loadFavourites();
            useReadingsStore().loadReadings();
        }
    }

    return {
        isAuthenticated,
        toggleAuthenticatedStatus,
        checkAuthenticatedStatus,
    };
});
