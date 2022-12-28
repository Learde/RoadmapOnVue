<script setup>
import { stringEscape } from "@helpers";
import { useFavouritesStore } from "@stores";
import { storeToRefs } from "pinia";

const { favourites } = storeToRefs(useFavouritesStore());
</script>

<template>
    <main class="favourite-view">
        <div class="favourite-view__header">
            <h4>Список избранных дорожных карт</h4>
        </div>
        <div class="favourite-view__content" v-if="favourites">
            <div
                @click="
                    $router.push({
                        name: 'viewTopic',
                        params: { id: favourite.topic.id },
                    })
                "
                class="favourite-view__topic"
                v-for="favourite in favourites"
                :key="favourite.topic.id"
            >
                <p class="favourite-view__favourite.topic-id">
                    roadmap #{{ favourite.topic.id }}
                </p>
                <h5>{{ favourite.topic.title }}</h5>
                <p>{{ stringEscape(favourite.topic.description, 50) }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.favourite-view {
    width: 100%;
    &__header {
        background-color: var(--rm-c-white);
        padding: var(--rm-container-paddings);
        width: 100%;
    }

    &__content {
        padding: var(--rm-container-paddings);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 16px;
        row-gap: 16px;
    }

    &__topic {
        height: 150px;
        background-color: var(--rm-c-white);
        border-radius: var(--rm-border-radius);
        padding: 14px 20px;
        transition: all 0.2s;

        &:hover {
            background-color: var(--rm-c-selected);
            cursor: pointer;
        }
    }

    &__topic-id {
        font-weight: bold;
        font-size: 12px;
    }
}
</style>
