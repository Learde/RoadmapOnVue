<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "@uikit/BaseInput.vue";
import BaseButton from "@uikit/BaseButton.vue";
import { IconEnvelope, IconLockBold } from "@icons";
import { showError } from "@packages";
import { doLogin } from "@api";
import { parse, differenceInMilliseconds } from "date-fns";
import { setCookie } from "@helpers";
import { useGeneralStore } from "@stores";

const email = ref(null);
const password = ref(null);
const router = useRouter();

const disabled = computed(() => !email.value || !password.value);
let loginStarted = false;

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const handleLogin = async () => {
    if (disabled.value || loginStarted) return;

    if (email.value && !validateEmail(email.value)) {
        showError({
            title: "Ошибка авторизации",
            text: "Указана невалидная почта",
        });
        return;
    }

    if (password.value?.length < 6) {
        showError({
            title: "Ошибка авторизации",
            text: "Пароль слишком короткий (мин. 6 символов)",
        });
        return;
    }

    try {
        const userData = (
            await doLogin({ email: email.value, password: password.value })
        ).data;
        if (userData.error) throw "";

        // Установка токена в куки
        const date = parse(userData.exp, "MM-dd-yyyy HH:mm", new Date());
        const millis = differenceInMilliseconds(date.getTime(), new Date());
        setCookie("jwt", userData.token, millis);

        // Если все ок, поднимет флаг авторизованности
        useGeneralStore().checkAuthenticatedStatus();

        // Идем на главную
        router.push({ name: "home" });
    } catch (e) {
        showError({
            title: "Ошибка авторизации",
            text: "Неправильный логин или пароль",
        });
    }
};
</script>

<template>
    <div>
        <BaseInput
            v-model="email"
            class="login-form__input"
            type="email"
            placeholder="e-mail"
        >
            <template #icon><IconEnvelope /></template>
        </BaseInput>
        <BaseInput
            v-model="password"
            class="login-form__input"
            type="password"
            placeholder="пароль"
        >
            <template #icon><IconLockBold /></template>
        </BaseInput>
        <BaseButton
            @click="handleLogin"
            :disabled="disabled"
            class="login-form__btn"
        >
            Войти
        </BaseButton>
    </div>
</template>

<style lang="scss" scoped>
.login-form {
    &__input {
        margin-bottom: 28px;
    }

    &__btn {
        margin-top: 4px;
    }
}
</style>
