<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    placeholder: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "text",
    },
    modelValue: [Number, String],
});

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <div class="b-input">
        <input
            :type="type"
            :placeholder="placeholder"
            v-model="value"
            class="b-input__input"
        />
        <span class="b-input__icon">
            <slot name="icon" />
        </span>
    </div>
</template>

<style lang="scss" scoped>
.b-input {
    width: 100%;
    position: relative;

    &__input {
        width: 100%;
        font-size: var(--rm-font-size-h5);
        padding: 8px 12px;
        text-align: center;
        border-radius: var(--rm-border-radius);
        border: 1px solid var(--rm-c-border);

        transition: all 0.05s;

        &:focus {
            outline: 2px solid var(--rm-c-blue-4);
        }
    }

    &__icon {
        display: inline-block;
        height: 16px;
        width: 16px;
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        &:deep(svg) {
            height: 100%;
            width: 100%;
            color: var(--rm-c-primary);
        }
    }
}
</style>
