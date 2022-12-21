<script setup>
import { computed, onMounted, ref } from "vue";
import BaseFormGroup from "@uikit/BaseFormGroup.vue";
import BaseInput from "@uikit/BaseInput.vue";
import BaseTextarea from "@uikit/BaseTextarea.vue";
import BaseButton from "@uikit/BaseButton.vue";
import { addNode, getTopic, editTopic } from "@api";
import { useRouter } from "vue-router";
import { showError } from "@packages";

const props = defineProps({
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

const title = ref(null);
const description = ref(null);
const router = useRouter();

const disabled = computed(() => !title.value || !description.value);
let saveStarted = false;

const saveTopic = async () => {
    if (disabled.value || saveStarted) return;
    try {
        saveStarted = true;
        let saveResult = null;
        if (!props.id) {
            saveResult = (
                await addNode({
                    title: title.value,
                    description: description.value,
                    topicId: +props.topicId,
                    parentId: props.parentId === null ? null : +props.parentId,
                })
            ).data;
        } else {
            saveResult = (
                await editTopic({
                    id: props.id,
                    title: title.value,
                    description: description.value,
                })
            ).data;
        }

        if (saveResult.error) throw "";

        router.push({ name: "viewTopic", params: { id: props.topicId } });
    } catch (e) {
        showError({
            title: "Ошибка сохранения",
            text: "Были введенны неверные данные",
        });
    } finally {
        saveStarted = false;
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

        title.value = topicData.title;
        description.value = topicData.description;
    } catch (e) {
        showError({
            title: "Ошибка загрузки",
            text: "Что-то пошло не так",
        });
    }
};

onMounted(() => {
    if (props.id) {
        loadTopic();
    }
});
</script>

<template>
    <div class="node-form">
        <div class="node-form__content">
            <BaseFormGroup class="node-form__group">
                <template #label>Название:</template>
                <BaseInput
                    placeholder="Название нового узла"
                    type="text"
                    v-model="title"
                />
            </BaseFormGroup>
            <BaseFormGroup class="node-form__group">
                <template #label>Описание:</template>
                <BaseTextarea
                    placeholder="Укажите здесь детальное описание узла дорожной карты"
                    v-model="description"
                />
            </BaseFormGroup>
            <BaseButton
                @click="saveTopic"
                :disabled="disabled"
                class="node-form__btn"
                >Сохранить</BaseButton
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
.node-form {
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
