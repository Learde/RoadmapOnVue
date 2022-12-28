<script setup>
import { stringEscape } from "@helpers";
import { useReadingsStore } from "@stores";
import { storeToRefs } from "pinia";

const { readings } = storeToRefs(useReadingsStore());
</script>

<template>
    <main class="read-view">
        <div class="read-view__header">
            <h4>Список дорожных карт в процессе</h4>
        </div>
        <div class="read-view__content" v-if="readings">
            <div
                @click="
                    $router.push({
                        name: 'viewTopic',
                        params: { id: reading.topic.id },
                    })
                "
                class="read-view__topic"
                v-for="reading in readings"
                :key="reading.topic.id"
            >
                <p class="read-view__topic-id">
                    roadmap #{{ reading.topic.id }}
                </p>
                <h5>{{ reading.topic.title }}</h5>
                <p>{{ stringEscape(reading.topic.description, 50) }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.read-view {
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
