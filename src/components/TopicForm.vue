<script setup>
import { computed, ref } from "vue";
import BaseFormGroup from "@uikit/BaseFormGroup.vue";
import BaseInput from "@uikit/BaseInput.vue";
import BaseTextarea from "@uikit/BaseTextarea.vue";
import BaseButton from "@uikit/BaseButton.vue";
import { addTopic } from "@api";
import { useRouter } from "vue-router";
import { showError } from "@packages";

const title = ref(null);
const description = ref(null);
const router = useRouter();

const disabled = computed(() => !title.value || !description.value);
let saveStarted = false;

const saveTopic = async () => {
    if (disabled.value || saveStarted) return;
    try {
        saveStarted = true;
        const saveResult = (
            await addTopic({
                title: title.value,
                description: description.value,
            })
        ).data;

        if (saveResult.error) throw "";

        router.push({ name: "viewTopic", params: { id: saveResult.id } });
    } catch (e) {
        showError({
            title: "Ошибка сохранения",
            text: "Были введенны неверные данные",
        });
    } finally {
        saveStarted = false;
    }
};
</script>

<template>
    <div class="topic-form">
        <div class="topic-form__content">
            <BaseFormGroup class="topic-form__group">
                <template #label>Название:</template>
                <BaseInput
                    placeholder="Название вашей дорожной карты"
                    type="text"
                    v-model="title"
                />
            </BaseFormGroup>
            <BaseFormGroup class="topic-form__group">
                <template #label>Описание:</template>
                <BaseTextarea
                    placeholder="Укажите здесь детальное описание дорожной карты"
                    v-model="description"
                />
            </BaseFormGroup>
            <BaseButton
                @click="saveTopic"
                :disabled="disabled"
                class="topic-form__btn"
                >Сохранить</BaseButton
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
.topic-form {
    background-color: var(--rm-c-white);
    padding: 24px 0;
    border-radius: var(--rm-border-radius);

    &__content {
        width: 70%;
        margin: 0 auto;
    }

    &__group {
        margin-bottom: 24px;
    }

    &__btn {
        margin-left: 76px;
        margin-top: 14px;
    }
}
</style>
