<script setup>
import NodeForm from "@components/NodeForm.vue";

defineProps({
    id: {
        type: [String, Number],
        default: null,
    },
});
</script>

<template>
    <main class="edit-node">
        <div class="edit-node__header">
            <h4>Редактирование узла</h4>
        </div>
        <div class="edit-node__content">
            <NodeForm :id="id" class="edit-node__form" />
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
