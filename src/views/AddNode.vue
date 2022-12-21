<script setup>
import NodeForm from "@components/NodeForm.vue";

defineProps({
    id: {
        type: [String, Number],
        default: null,
    },
    parentId: {
        type: [String, Number],
        default: null,
    },
    topicId: [String, Number],
});
</script>

<template>
    <main class="edit-node">
        <div class="edit-node__header">
            <h4>Добавление нового узла дорожной карты</h4>
        </div>
        <div class="edit-node__content">
            <NodeForm
                :parent-id="parentId"
                :topic-id="topicId"
                :id="id"
                class="edit-node__form"
            />
        </div>
    </main>
</template>

<style lang="scss" scoped>
.edit-node {
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
