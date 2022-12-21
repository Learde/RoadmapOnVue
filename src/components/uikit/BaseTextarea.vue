<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    placeholder: {
        type: String,
        default: "",
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
    <textarea :placeholder="placeholder" v-model="value" class="b-textarea" />
</template>

<style lang="scss" scoped>
.b-textarea {
    width: 100%;
    font-size: var(--rm-font-size-h5);
    padding: 8px 12px;
    text-align: center;
    border-radius: var(--rm-border-radius);
    border: 1px solid var(--rm-c-border);
    resize: vertical;
    min-height: 36.6px;
    max-height: 200px;
    font-family: var(--rm-font-family);

    transition: all 0.05s;

    &:focus {
        outline: 2px solid var(--rm-c-blue-4);
    }
}
</style>
