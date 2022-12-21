<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getNode, deleteNode } from "@api";
import { showError } from "@packages";
import BaseButton from "@uikit/BaseButton.vue";
const props = defineProps({
    id: [String, Number],
});

const node = ref(null);
const router = useRouter();

const handleDeleteNode = async () => {
    try {
        const nodeData = (
            await deleteNode({
                nodeId: props.id,
            })
        ).data;

        if (nodeData.error) throw "";

        router.push({ name: "viewTopic", params: { id: node.value.topic_id } });
    } catch (e) {
        showError({
            title: "Ошибка удаления",
            text: "Что-то пошло не так",
        });
    }
};

const loadNode = async () => {
    try {
        const nodeData = (
            await getNode({
                id: props.id,
            })
        ).data;

        if (nodeData.error) throw "";

        node.value = nodeData;
    } catch (e) {
        showError({
            title: "Ошибка загрузки",
            text: "Что-то пошло не так",
        });
    }
};

onMounted(() => {
    loadNode();
});
</script>

<template>
    <main class="node-view">
        <div class="node-view__header">
            <h4 class="node-view__heading">Просмотр узла</h4>
            <BaseButton
                @click="$router.push({ name: 'editNode', params: { id: id } })"
                size="sm"
                >Редактировать</BaseButton
            >
            <BaseButton @click="handleDeleteNode" size="sm" variant="red"
                >Удалить</BaseButton
            >
        </div>
        <div v-if="node" class="node-view__content">
            <h5 class="node-view__title">Название: {{ node.title }}</h5>
            <p>Описание: {{ node.description }}</p>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.node-view {
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

    &__heading {
        margin-right: auto;
    }
}
</style>
