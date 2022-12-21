import { createRouter, createWebHistory } from "vue-router";
import { useGeneralStore } from "@stores";

import HomeView from "@views/HomeView.vue";
import AuthView from "@views/AuthView.vue";
import EditTopic from "@views/EditTopic.vue";
import TopicView from "@views/TopicView.vue";
import AddNode from "@views/AddNode.vue";
import MyRoadmapsView from "@views/MyRoadmapsView.vue";
import FavouritesView from "@views/FavouritesView.vue";
import ReadView from "@views/ReadView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: AuthView,
        },
        {
            path: "/registration",
            name: "registration",
            component: AuthView,
        },
        {
            path: "/add/topic",
            name: "addTopic",
            component: EditTopic,
        },
        {
            path: "/edit/topic/:id",
            props: true,
            name: "editTopic",
            component: EditTopic,
        },
        {
            path: "/topic/:id",
            props: true,
            name: "viewTopic",
            component: TopicView,
        },
        {
            path: "/topic/:topicId/node/add",
            props: true,
            name: "addNode",
            component: AddNode,
        },
        {
            path: "/topic/:topicId/node/add/:parentId",
            props: true,
            name: "addChildNode",
            component: AddNode,
        },
        {
            path: "/my",
            name: "myRoadMaps",
            component: MyRoadmapsView,
        },
        {
            path: "/favourites",
            name: "favourites",
            component: FavouritesView,
        },
        {
            path: "/read",
            name: "read",
            component: ReadView,
        },
    ],
});

router.beforeEach(async (to) => {
    const generalStore = useGeneralStore();
    if (
        // make sure the user is authenticated
        !generalStore.isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== "login" &&
        to.name !== "registration"
    ) {
        // redirect the user to the login page
        return { name: "login" };
    } else if (
        (to.name === "login" || to.name === "registration") &&
        generalStore.isAuthenticated
    ) {
        return { name: "home" };
    }
});

export default router;
