<script setup>
import { computed, onMounted, ref } from "vue";
import BaseFormGroup from "@uikit/BaseFormGroup.vue";
import BaseInput from "@uikit/BaseInput.vue";
import BaseTextarea from "@uikit/BaseTextarea.vue";
import BaseButton from "@uikit/BaseButton.vue";
import { addNode, getNode, editNode } from "@api";
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
    topicId: {
        type: [String, Number],
        default: null,
    },
});

const title = ref(null);
const description = ref(null);
const node = ref(null);
const router = useRouter();

const disabled = computed(() => !title.value || !description.value);
let saveStarted = false;

const saveNode = async () => {
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
                await editNode({
                    id: node.value.id,
                    title: title.value,
                    description: description.value,
                    topicId: +node.value.topic_id,
                    parentId:
                        node.value.parent_id === null
                            ? null
                            : +node.value.parent_id,
                })
            ).data;
        }

        if (saveResult.error) throw "";

        router.push({
            name: "viewTopic",
            params: { id: props.topicId ?? node.value.topic_id },
        });
    } catch (e) {
        showError({
            title: "???????????? ????????????????????",
            text: "???????? ???????????????? ???????????????? ????????????",
        });
    } finally {
        saveStarted = false;
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
        title.value = nodeData.title;
        description.value = nodeData.description;
    } catch (e) {
        showError({
            title: "???????????? ????????????????",
            text: "??????-???? ?????????? ???? ??????",
        });
    }
};

onMounted(() => {
    if (props.id) {
        loadNode();
    }
});
</script>

<template>
    <div class="node-form">
        <div class="node-form__content">
            <BaseFormGroup class="node-form__group">
                <template #label>????????????????:</template>
                <BaseInput
                    placeholder="???????????????? ???????????? ????????"
                    type="text"
                    v-model="title"
                />
            </BaseFormGroup>
            <BaseFormGroup class="node-form__group">
                <template #label>????????????????:</template>
                <BaseTextarea
                    placeholder="?????????????? ?????????? ?????????????????? ???????????????? ???????? ???????????????? ??????????"
                    v-model="description"
                />
            </BaseFormGroup>
            <BaseButton
                @click="saveNode"
                :disabled="disabled"
                class="node-form__btn"
                >??????????????????</BaseButton
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
