<script setup>
import AttachmentForm from "@components/AttachmentForm.vue";

defineProps({
    id: {
        type: [String, Number],
        default: null,
    },
    userId: {
        type: [String, Number],
        default: null,
    },
});
</script>

<template>
    <main class="edit-node">
        <div class="edit-node__header">
            <h4>Добавление вложения</h4>
        </div>
        <div class="edit-node__content">
            <AttachmentForm
                :id="id"
                :user-id="userId"
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
