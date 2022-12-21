<script setup>
import { ref } from "vue";
import BaseFormGroup from "@uikit/BaseFormGroup.vue";
import BaseInput from "@uikit/BaseInput.vue";
import BaseTextarea from "@uikit/BaseTextarea.vue";

const title = ref(null);
const description = ref(null);
</script>

<template>
    <div class="topic-form">
        <BaseFormGroup>
            <template #label>Название:</template>
            <BaseInput type="text" v-model="title" />
        </BaseFormGroup>
        <BaseFormGroup>
            <template #label>Описание:</template>
            <BaseTextarea v-model="description" />
        </BaseFormGroup>
    </div>
</template>

<style lang="scss" scoped>
.topic-form {
    background-color: var(--rm-c-white);
}
</style>
