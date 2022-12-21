<script setup>
import {
    IconTable,
    IconMarkerCircle,
    IconStar,
    IconBookmarkSimple,
    IconFilePlus,
} from "@icons";
import { useRoute, RouterLink } from "vue-router";
const route = useRoute();
</script>

<template>
    <side class="the-sidebar">
        <RouterLink
            :to="{ name: 'home' }"
            class="the-sidebar__link"
            :class="{ 'the-sidebar__link--active': route.name === 'home' }"
        >
            <IconTable /> Дорожные карты
        </RouterLink>
        <RouterLink
            :to="{ name: 'addTopic' }"
            class="the-sidebar__link"
            :class="{ 'the-sidebar__link--active': route.name === 'addTopic' }"
        >
            <IconFilePlus /> Новая карта
        </RouterLink>
        <RouterLink
            :to="{ name: 'home' }"
            class="the-sidebar__link"
            :class="{ 'the-sidebar__link--active': false }"
        >
            <IconMarkerCircle /> Мои карты
        </RouterLink>
        <RouterLink
            :to="{ name: 'home' }"
            class="the-sidebar__link"
            :class="{ 'the-sidebar__link--active': false }"
        >
            <IconStar /> Избранные
        </RouterLink>
        <RouterLink
            :to="{ name: 'home' }"
            class="the-sidebar__link"
            :class="{ 'the-sidebar__link--active': false }"
        >
            <IconBookmarkSimple /> Читаю
        </RouterLink>
    </side>
</template>

<style lang="scss" scoped>
.the-sidebar {
    position: relative;
    z-index: 9;
    padding-top: 4px;
    height: calc(100vh - var(--rm-header-height));
    width: 210px;
    flex-shrink: 0;
    flex-grow: 0;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.17);
    background-color: var(--rm-c-white);

    &__link {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 15px;
        padding: 8px 16px;
        margin-bottom: 8px;
        color: var(--rm-c-black) !important;
        text-decoration: none;

        &:hover {
            background-color: var(--rm-c-selected);
        }

        &:deep(svg) {
            color: var(--rm-c-black);
            height: 20px;
            width: 20px;
            margin-right: 5px;
        }

        &--active {
            background-color: var(--rm-c-selected);
            color: var(--rm-c-primary);
            border-right: 3px solid var(--rm-c-primary);

            &:deep(svg) {
                color: var(--rm-c-primary);
            }
        }
    }
}
</style>
