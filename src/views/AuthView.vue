<script setup>
import LoginForm from "@components/LoginForm.vue";
import RegistrationForm from "@components/RegistrationForm.vue";
</script>

<template>
    <div class="auth-view">
        <h1 class="auth-view__heading">RoadMaps</h1>
        <div class="auth-view__content">
            <div class="auth-view__tabs">
                <span
                    @click="$router.push({ name: 'login' })"
                    class="auth-view__tab"
                    :class="{
                        'auth-view__tab--active': $route.name === 'login',
                    }"
                    >Вход</span
                >
                <span
                    @click="$router.push({ name: 'registration' })"
                    class="auth-view__tab"
                    :class="{
                        'auth-view__tab--active':
                            $route.name === 'registration',
                    }"
                    >Регистрация</span
                >
            </div>
            <LoginForm v-if="$route.name === 'login'" />
            <RegistrationForm v-else-if="$route.name === 'registration'" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.auth-view {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &__content {
        max-width: 360px;
        width: 360px;
    }

    &__heading {
        margin-bottom: 40px;
    }

    &__tabs {
        display: flex;
        width: 100%;
        border-bottom: 1px solid var(--rm-c-border);
        margin-bottom: 22px;
        padding-bottom: 8px;
    }

    &__tab {
        margin-right: 32px;
        font-size: var(--rm-font-size-h5);
        line-height: var(--rm-line-height-h5);
        border-bottom: 2px solid rgba(0, 0, 0, 0);
        transition: all 0.05s;

        &:hover {
            cursor: pointer;
            color: var(--rm-c-primary);
        }

        &--active {
            color: var(--rm-c-primary);
            border-bottom-color: var(--rm-c-primary);
            padding-bottom: 5px;
        }
    }
}
</style>
