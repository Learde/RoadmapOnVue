import { ref } from "vue";
import { defineStore } from "pinia";
import { getCookie, isAuth } from "@helpers";
import { setToken } from "@api";

export const useGeneralStore = defineStore("general", () => {
    const isAuthenticated = ref(isAuth());
    function toggleAuthenticatedStatus(value) {
        isAuthenticated.value = value;
    }

    function checkAuthenticatedStatus() {
        isAuthenticated.value = isAuth();

        if (isAuthenticated.value) {
            console.log(getCookie("jwt"));
            setToken(getCookie("jwt"));
        }
    }

    return {
        isAuthenticated,
        toggleAuthenticatedStatus,
        checkAuthenticatedStatus,
    };
});
