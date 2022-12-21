<script setup>
import { ref, onMounted } from "vue";
import { getReads } from "@api";
import { showError } from "@packages";
import { stringEscape } from "@helpers";

const topics = ref(null);

const loadTopics = async () => {
    try {
        const topicsData = (await getReads()).data;

        if (topicsData.error) throw "";

        topics.value = topicsData;
    } catch (e) {
        showError({
            title: "Ошибка загрузки дорожных карт в процессе",
            text: "Что-то пошло не так",
        });
    }
};

onMounted(() => {
    loadTopics();
});
</script>

<template>
    <main class="read-view">
        <div class="read-view__header">
            <h4>Список дорожных карт в процессе</h4>
        </div>
        <div class="read-view__content" v-if="topics">
            <div
                @click="
                    $router.push({
                        name: 'viewTopic',
                        params: { id: topic.id },
                    })
                "
                class="read-view__topic"
                v-for="topic in topics"
                :key="topic.id"
            >
                <p class="read-view__topic-id">roadmap #{{ topic.id }}</p>
                <h5>{{ topic.title }}</h5>
                <p>{{ stringEscape(topic.description, 50) }}</p>
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
