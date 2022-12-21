<script setup>
import { RouterView } from "vue-router";
import { useGeneralStore } from "@stores";
import TheHeader from "@components/TheHeader.vue";
import { storeToRefs } from "pinia";
import TheSidebar from "@components/TheSidebar.vue";

const generalStore = useGeneralStore();
const { isAuthenticated } = storeToRefs(generalStore);
</script>

<template>
    <TheHeader v-if="isAuthenticated" />
    <div class="app-wrapper" :class="{ 'app-wrapper--lower': isAuthenticated }">
        <TheSidebar v-if="isAuthenticated" />
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;

    &--lower {
        height: calc(100% - var(--rm-header-height));
    }
}
</style>
