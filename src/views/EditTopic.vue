<script setup>
import TopicForm from "@components/TopicForm.vue";
</script>

<template>
    <main class="edit-topic">
        <div class="edit-topic__header">
            <h4>Добавление новой дорожной карты</h4>
        </div>
        <div class="edit-topic__content">
            <TopicForm />
        </div>
    </main>
</template>

<style lang="scss" scoped>
.edit-topic {
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
