<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getTopic, deleteTopic } from "@api";
import { showError } from "@packages";
import BaseButton from "@uikit/BaseButton.vue";
const props = defineProps({
    id: [String, Number],
});

const topic = ref(null);
const router = useRouter();

const doDelete = async () => {
    try {
        const topicData = (
            await deleteTopic({
                id: props.id,
            })
        ).data;

        if (topicData.error) throw "";

        router.push({ name: "home" });
    } catch (e) {
        showError({
            title: "Ошибка удаления",
            text: "Что-то пошло не так",
        });
    }
};

const loadTopic = async () => {
    try {
        const topicData = (
            await getTopic({
                id: props.id,
            })
        ).data;

        if (topicData.error) throw "";

        topic.value = topicData;
    } catch (e) {
        showError({
            title: "Ошибка загрузки",
            text: "Что-то пошло не так",
        });
    }
};

onMounted(() => {
    loadTopic();
});
</script>

<template>
    <main class="topic-view">
        <div class="topic-view__header">
            <h4>Просмотр дорожной карты #{{ id }}</h4>
            <BaseButton size="sm" class="topic-view__btn--ml-auto"
                >Редактировать узлы</BaseButton
            >
            <BaseButton
                @click="$router.push({ name: 'editTopic', params: { id: id } })"
                size="sm"
                >Редактировать</BaseButton
            >
            <BaseButton @click="doDelete" size="sm" variant="red"
                >Удалить</BaseButton
            >
        </div>
        <div v-if="topic" class="topic-view__content">
            <h5 class="topic-view__title">Название: {{ topic.title }}</h5>
            <p>Описание: {{ topic.description }}</p>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.topic-view {
    width: 100%;
    &__header {
        background-color: var(--rm-c-white);
        padding: var(--rm-container-paddings);
        width: 100%;
        display: flex;
        column-gap: 10px;
    }

    &__btn--ml-auto {
        margin-left: auto;
    }

    &__content {
        margin: 20px 24px;
        padding: var(--rm-container-paddings);
        background-color: var(--rm-c-white);
        border-radius: var(--rm-border-radius);
    }

    &__title {
        margin-bottom: 10px;
    }
}
</style>
