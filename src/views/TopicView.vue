<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    getTopic,
    deleteTopic,
    getNodes,
    deleteNode,
    addFavourite,
    deleteFavourite,
} from "@api";
import { showError } from "@packages";
import {
    IconPlusBold,
    IconTrashBold,
    IconEyeBold,
    IconHeartFill,
    IconHeartBold,
} from "@icons";
import { stringEscape } from "@helpers";
import { useUserStore } from "@stores";
import BaseButton from "@uikit/BaseButton.vue";
import VueTree from "@ssthouse/vue3-tree-chart";
import { storeToRefs } from "pinia";
const props = defineProps({
    id: [String, Number],
});

const topic = ref(null);
const nodes = ref(null);
const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const doDelete = async () => {
    try {
        const topicData = (
            await deleteTopic({
                id: props.id,
            })
        ).data;

        if (topicData.error) throw "";

        router.push({ name: "home" });
    } catch (e) {
        showError({
            title: "Ошибка удаления",
            text: "Что-то пошло не так",
        });
    }
};

const handleDeleteNode = async (nodeId) => {
    try {
        const nodeData = (
            await deleteNode({
                nodeId,
            })
        ).data;

        if (nodeData.error) throw "";

        loadNodes();
    } catch (e) {
        showError({
            title: "Ошибка удаления",
            text: "Что-то пошло не так",
        });
    }
};

const handleFollow = async () => {
    try {
        const favData = (
            await addFavourite({
                topicId: props.id,
                userId: 1,
            })
        ).data;

        if (favData.error) throw "";

        // TODO: поменять флаг
    } catch (e) {
        showError({
            title: "Ошибка добавления в избранное",
            text: "Не удалось добавить в избранное, повторите попытку позже",
        });
    }
};

const handleUnfollow = async () => {
    try {
        const favData = (
            await deleteFavourite({
                topicId: props.id,
            })
        ).data;

        if (favData.error) throw "";

        // TODO: поменять флаг
    } catch (e) {
        showError({
            title: "Ошибка добавления в избранное",
            text: "Не удалось добавить в избранное, повторите попытку позже",
        });
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

        topic.value = topicData;
    } catch (e) {
        showError({
            title: "Ошибка загрузки",
            text: "Что-то пошло не так",
        });
    }
};

const loadNodes = async () => {
    try {
        const nodesData = (
            await getNodes({
                topicId: props.id,
            })
        ).data;

        if (nodesData.error) throw "";

        nodes.value = nodesData;
    } catch (e) {
        showError({
            title: "Ошибка загрузки узлов",
            text: "Что-то пошло не так",
        });
    }
};

onMounted(() => {
    loadTopic();
    loadNodes();
});
</script>

<template>
    <main class="topic-view">
        <div class="topic-view__header">
            <h4 class="topic-view__heading">
                Просмотр дорожной карты #{{ id }}
            </h4>
            <BaseButton
                v-if="true"
                @click="handleFollow"
                size="sm"
                variant="grey"
            >
                <IconHeartBold class="topic-view__heart" />
            </BaseButton>
            <BaseButton v-else @click="handleUnfollow" size="sm" variant="red">
                <IconHeartFill class="topic-view__heart" />
            </BaseButton>
            <template
                v-if="topic && user && +topic.created_user_id === +user.id"
            >
                <BaseButton
                    v-if="!nodes || nodes.length === 0"
                    @click="
                        $router.push({
                            name: 'addNode',
                            params: { topicId: id },
                        })
                    "
                    size="sm"
                    >Добавить корневой узел</BaseButton
                >
                <BaseButton
                    @click="
                        $router.push({ name: 'editTopic', params: { id: id } })
                    "
                    size="sm"
                    >Редактировать</BaseButton
                >
                <BaseButton @click="doDelete" size="sm" variant="red"
                    >Удалить</BaseButton
                >
            </template>
        </div>
        <div v-if="topic" class="topic-view__content">
            <h5 class="topic-view__title">Название: {{ topic.title }}</h5>
            <p>Описание: {{ topic.description }}</p>
        </div>
        <div
            v-if="nodes"
            class="topic-view__content topic-view__content--height"
        >
            <VueTree
                class="topic-view__tree"
                :dataset="nodes"
                :config="{ nodeWidth: 200, nodeHeight: 100, levelHeight: 175 }"
                linkStyle="straight"
                :collapse-enabled="false"
            >
                <template v-slot:node="{ node }">
                    <div class="topic-view__node">
                        <div class="topic-view__node-title">
                            {{ node.title }}
                        </div>
                        <div class="topic-view__node-description">
                            {{ stringEscape(node.description, 37) }}
                        </div>
                        <div class="topic-view__node-icon">
                            <BaseButton
                                v-if="
                                    topic &&
                                    user &&
                                    +topic.created_user_id === +user.id
                                "
                                @click="
                                    $router.push({
                                        name: 'addChildNode',
                                        params: {
                                            topicId: id,
                                            parentId: node.id,
                                        },
                                    })
                                "
                                size="xxs"
                            >
                                <IconPlusBold />
                            </BaseButton>
                            <BaseButton
                                @click="
                                    $router.push({
                                        name: 'viewNode',
                                        params: { id: node.id },
                                    })
                                "
                                size="xxs"
                            >
                                <IconEyeBold />
                            </BaseButton>
                            <BaseButton
                                v-if="
                                    topic &&
                                    user &&
                                    +topic.created_user_id === +user.id
                                "
                                @click="handleDeleteNode(node.id)"
                                variant="red"
                                size="xxs"
                            >
                                <IconTrashBold />
                            </BaseButton>
                        </div>
                    </div>
                </template>
            </VueTree>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.topic-view {
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

        &--height {
            min-height: 480px;
        }
    }

    &__heart {
        height: 18px;
        width: 18px;
        position: relative;
        top: 3px;
    }

    &__title {
        margin-bottom: 10px;
    }

    &__node {
        width: 150px;
        background-color: var(--rm-c-blue-1);
        padding: 10px 10px;
        border-radius: var(--rm-border-radius);
    }

    &__node-title {
        font-weight: 700;
    }

    &__tree {
        min-height: 450px;

        &:deep(.node-slot) {
            cursor: default !important;
        }
    }

    &__heading {
        margin-right: auto;
    }

    &__node-icon {
        margin-top: 6px;
        display: flex;
        justify-content: space-around;

        &:deep(svg) {
            width: 16px;
            height: 16px;
            position: relative;
            top: 3px;
        }
    }
}
</style>
