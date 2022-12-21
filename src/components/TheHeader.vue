<script setup>
import { useRouter } from "vue-router";
import { IconUserBold, IconRightFromBracket } from "@icons";
import { useGeneralStore } from "@stores";
import { setCookie } from "@helpers";

const generalStore = useGeneralStore();
const router = useRouter();

const doLogout = () => {
    setCookie("jwt", null, 0);
    generalStore.checkAuthenticatedStatus();
    router.push({ name: "login" });
};
</script>

<template>
    <header class="the-header">
        <h4>RoadMaps</h4>
        <div class="the-header__profile">
            <span>Профиль</span>
            <div class="the-header__avatar">
                <IconUserBold />
            </div>
        </div>
        <IconRightFromBracket @click="doLogout" class="the-header__logout" />
    </header>
</template>

<style lang="scss" scoped>
.the-header {
    width: 100%;
    background-color: var(--rm-c-blue-10);
    height: var(--rm-header-height);
    color: var(--rm-c-white);
    padding: 0 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    &__profile {
        display: flex;
        margin-left: auto;
        align-items: center;
        cursor: pointer;
    }

    &__avatar {
        margin-left: 10px;
        height: 26px;
        width: 26px;
        background-color: var(--rm-c-neutral-3);
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:deep(svg) {
            height: 60%;
            width: 60%;
            color: var(--rm-c-black);
        }
    }

    &__logout {
        color: var(--rm-c-white);
        margin-left: 25px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
}
</style>
