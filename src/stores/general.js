import { ref } from "vue";
import { defineStore } from "pinia";
import { isAuth } from "@helpers";

export const useGeneralStore = defineStore("general", () => {
    const isAuthenticated = ref(isAuth());
    function toggleAuthenticatedStatus(value) {
        isAuthenticated.value = value;
    }

    function checkAuthenticatedStatus() {
        isAuthenticated.value = isAuth();
    }

    return {
        isAuthenticated,
        toggleAuthenticatedStatus,
        checkAuthenticatedStatus,
    };
});
