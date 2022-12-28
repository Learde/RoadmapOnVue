<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getNode, deleteNode, getAttachments, addNodeRate } from "@api";
import { showError } from "@packages";
import BaseButton from "@uikit/BaseButton.vue";
import { useUserStore } from "@stores";
import { storeToRefs } from "pinia";
import BaseFormGroup from "@uikit/BaseFormGroup.vue";
import BaseTextarea from "@uikit/BaseTextarea.vue";
import {stringEscape} from "../helpers";
const props = defineProps({
    id: [String, Number],
    userId: [String, Number],
});

const node = ref(null);
const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

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

const comment = ref(null);
const rate = ref(5);

const saveComment = async () => {
    try {
        const saveData = (
            await addNodeRate({
                nodeId: +props.id,
                comment: comment.value,
                rate: rate.value,
            })
        ).data;

        if (saveData.error) throw "";

        loadNode();
    } catch (e) {
        showError({
            title: "Ошибка комментарования",
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
            <BaseButton @click="$router.go(-1)">Назад</BaseButton>
            <h4 class="node-view__heading">Просмотр узла</h4>
            <template v-if="node && user && +userId === +user.id">
                <BaseButton
                    @click="
                        $router.push({
                            name: 'addAttachment',
                            params: { id: id },
                        })
                    "
                    size="sm"
                >
                    Добавить вложение
                </BaseButton>
                <BaseButton
                    @click="
                        $router.push({ name: 'editNode', params: { id: id } })
                    "
                    size="sm"
                >
                    Редактировать
                </BaseButton>
                <BaseButton @click="handleDeleteNode" size="sm" variant="red">
                    Удалить
                </BaseButton>
            </template>
        </div>
        <div v-if="node" class="node-view__content">
            <h5 class="node-view__title">Название: {{ node.title }}</h5>
            <p>Описание: {{ node.description }}</p>
        </div>
        <div
            v-if="node && node.attachments && node.attachments.length > 0"
            class="node-view__content"
        >
            <h5 class="node-view__title">Вложения:</h5>
            <div v-for="attachment in node.attachments" :key="attachment.id">
                {{ attachment.url }}
            </div>
        </div>
        <div v-if="node?.rates?.length > 0" class="node-view__content">
            <h5 class="node-view__title">Оценки (среднее {{stringEscape(node.ave_rate + "", 4, "")}} из 5)</h5>
            <div class="node-view__rate-b" v-for="rate in node.rates">
                <h6 style="font-weight: bold;">Рейтинг: {{ rate.rate }} из 5</h6>
                <p><h6 style="display: inline; font-weight: bold;">Комментарий:</h6> {{ rate.comment }}</p>
            </div>
        </div>
        <div class="node-view__content">
            <div class="node-view__rate-header">
                <h5 class="node-view__title">Оценить</h5>
                <select class="node-view__rate" v-model="rate">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option selected>5</option>
                </select>
            </div>
            <BaseFormGroup>
                <BaseTextarea v-model="comment" />
            </BaseFormGroup>
            <BaseButton style="margin-top: 20px" @click="saveComment">
                Сохранить
            </BaseButton>
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

    &__rate-header {
        display: flex;
        align-items: center;
        column-gap: 50px;
    }

    &__rate {
        margin-bottom: 10px;
        background-color: #fff;
        border: 1px solid var(--rm-c-border);
        border-radius: var(--rm-border-radius);
        padding: 3px 10px;
        font-size: 16px;
    }

    &__rate-b {
        margin-bottom: 20px;
        border: 1px solid var(--rm-c-border);
        border-radius: var(--rm-border-radius);
        padding: 10px 20px;
    }
}
</style>
