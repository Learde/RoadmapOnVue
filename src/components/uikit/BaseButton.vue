<script setup>
defineEmits(["click"]);
defineProps({
    variant: {
        type: String,
        default: "primary",
    },
    size: {
        type: String,
        default: "md",
    },
});
</script>

<template>
    <button
        class="b-button"
        :class="`b-button--${variant} b-button--${size}`"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.b-button {
    line-height: var(--rm-line-height-h5);

    border-radius: var(--rm-border-radius);
    border: 0;

    color: var(--rm-c-white);
    transition: all 0.15s;

    cursor: pointer;

    &--md {
        font-size: var(--rm-font-size-h5);
        padding: 6px 24px;
    }

    &--sm {
        font-size: var(--rm-font-size);
        padding: 4px 18px;
    }

    &--xxs {
        font-size: var(--rm-font-size-small);
        padding: 2px 8px;
    }

    &--primary {
        background-color: var(--rm-c-primary);

        &:hover {
            background-color: var(--rm-c-primary-hover);
        }

        &:active {
            background-color: var(--rm-c-primary-hover);
        }

        &:focus {
            outline: 2px solid var(--rm-c-blue-4);
        }
    }

    &--red {
        background-color: var(--rm-c-error);

        &:hover {
            background-color: var(--rm-c-red-4);
        }

        &:active {
            background-color: var(--rm-c-red-4);
        }

        &:focus {
            outline: 2px solid var(--rm-c-red-3);
        }
    }

    &--grey {
        background-color: var(--rm-c-neutral-6);

        &:hover {
            background-color: var(--rm-c-neutral-5);
        }

        &:active {
            background-color: var(--rm-c-neutral-5);
        }

        &:focus {
            outline: 2px solid var(--rm-c-neutral-4);
        }
    }

    &--green {
        background-color: var(--rm-c-success);

        &:hover {
            background-color: var(--rm-c-green-4);
        }

        &:active {
            background-color: var(--rm-c-green-4);
        }

        &:focus {
            outline: 2px solid var(--rm-c-green-3);
        }
    }

    &[disabled] {
        background-color: var(--rm-c-neutral-4);
        border: 1px solid var(--rm-c-neutral-6);
        color: var(--rm-c-neutral-6);

        cursor: default;
    }
}
</style>
