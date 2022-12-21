<script setup>
defineEmits(["click"]);
</script>

<template>
    <button class="b-button" @click="$emit('click')">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.b-button {
    font-size: var(--rm-font-size-h5);
    line-height: var(--rm-line-height-h5);

    background-color: var(--rm-c-primary);
    border-radius: var(--rm-border-radius);
    color: var(--rm-c-white);
    border: 0;
    padding: 6px 24px;

    transition: all 0.15s;

    cursor: pointer;

    &:hover {
        background-color: var(--rm-c-primary-hover);
    }

    &:active {
        background-color: var(--rm-c-primary-hover);
    }

    &:focus {
        outline: 2px solid var(--rm-c-blue-4);
    }

    &[disabled] {
        background-color: var(--rm-c-neutral-4);
        border: 1px solid var(--rm-c-neutral-6);
        color: var(--rm-c-neutral-6);

        cursor: default;
    }
}
</style>
