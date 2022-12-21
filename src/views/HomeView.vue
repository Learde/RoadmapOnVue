<script setup></script>

<template>
    <main class="home-view">
        <div class="home-view__header">
            <h4>Список дорожных карт</h4>
        </div>
        <div class="home-view__content"></div>
    </main>
</template>

<style lang="scss" scoped>
.home-view {
    width: 100%;
    &__header {
        background-color: var(--rm-c-white);
        padding: var(--rm-container-paddings);
        width: 100%;
    }

    &__content {
        padding: var(--rm-container-paddings);
    }
}
</style>
