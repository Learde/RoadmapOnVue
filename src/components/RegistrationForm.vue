<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "@uikit/BaseInput.vue";
import BaseButton from "@uikit/BaseButton.vue";
import { IconEnvelope, IconLockBold } from "@icons";
import { showError, showSuccess } from "@packages";
import { doRegistration } from "@api";

const email = ref(null);
const password = ref(null);
const router = useRouter();

const disabled = computed(() => !email.value || !password.value);
let regStarted = false;

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const handleRegistration = async () => {
    if (disabled.value || regStarted) return;

    if (email.value && !validateEmail(email.value)) {
        showError({
            title: "Ошибка регистрации",
            text: "Указана невалидная почта",
        });
        return;
    }

    if (password.value?.length < 6) {
        showError({
            title: "Ошибка регистрации",
            text: "Пароль слишком короткий (мин. 6 символов)",
        });
        return;
    }

    try {
        regStarted = true;
        const userData = (
            await doRegistration({
                email: email.value,
                password: password.value,
            })
        ).data;
        if (userData.error) throw "";

        await showSuccess({
            title: "Успешная регистрация",
            text: "Теперь вы можете авторизоваться",
        });

        router.push({ name: "login" });
    } catch (e) {
        showError({
            title: "Ошибка регистрации",
            text: "Возможно, аккаунт уже существует",
        });
    } finally {
        regStarted = false;
    }
};
</script>

<template>
    <div>
        <BaseInput
            v-model="email"
            class="reg-form__input"
            type="email"
            placeholder="e-mail"
        >
            <template #icon><IconEnvelope /></template>
        </BaseInput>
        <BaseInput
            v-model="password"
            class="reg-form__input"
            type="password"
            placeholder="пароль"
        >
            <template #icon><IconLockBold /></template>
        </BaseInput>
        <BaseButton
            @click="handleRegistration"
            :disabled="disabled"
            class="reg-form__btn"
        >
            Зарегистрироваться
        </BaseButton>
    </div>
</template>

<style lang="scss" scoped>
.reg-form {
    &__input {
        margin-bottom: 28px;
    }

    &__btn {
        margin-top: 4px;
    }
}
</style>
