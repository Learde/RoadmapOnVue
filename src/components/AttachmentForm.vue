<script setup>
import { computed, ref } from "vue";
import BaseFormGroup from "@uikit/BaseFormGroup.vue";
import BaseTextarea from "@uikit/BaseTextarea.vue";
import BaseButton from "@uikit/BaseButton.vue";
import { addAttachment } from "@api";
import { useRouter } from "vue-router";
import { showError } from "@packages";

const props = defineProps({
    id: {
        type: [String, Number],
        default: null,
    },
    userId: [String, Number],
});

const url = ref(null);
const router = useRouter();

const disabled = computed(() => !url.value);
let saveStarted = false;

const saveAttachment = async () => {
    if (disabled.value || saveStarted) return;
    try {
        saveStarted = true;

        const saveResult = (
            await addAttachment({
                nodeId: props.id,
                data: url.value,
            })
        ).data;

        if (saveResult.error) throw "";
    } catch (e) {
        showError({
            title: "Ошибка сохранения",
            text: "Были введенны неверные данные",
        });
    } finally {
        saveStarted = false;
        router.push({
            name: "viewNode",
            params: { id: props.id, userId: props.userId },
        });
    }
};
</script>

<template>
    <div class="attachment-form">
        <div class="attachment-form__content">
            <BaseFormGroup class="attachment-form__group">
                <template #label>Вложение:</template>
                <BaseTextarea
                    placeholder="Укажите здесь URL на вложение"
                    v-model="url"
                />
            </BaseFormGroup>
            <BaseButton
                @click="saveAttachment"
                :disabled="disabled"
                class="attachment-form__btn"
            >
                Сохранить
            </BaseButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.attachment-form {
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
