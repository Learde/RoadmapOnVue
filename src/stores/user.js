import { ref } from "vue";
import { defineStore } from "pinia";
import { getUser } from "@api";

export const useUserStore = defineStore("user", () => {
    const user = ref(null);
    async function loadUser() {
        const userData = (await getUser()).data?.[0];
        if (userData) {
            user.value = userData;
        }
    }

    return {
        user,
        loadUser,
    };
});
