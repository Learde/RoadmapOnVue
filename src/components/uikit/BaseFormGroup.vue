<script setup>
defineProps({
    for: {
        type: [String, Number],
        default: "",
    },
});
</script>

<template>
    <div class="b-form-group">
        <label class="b-form-group" :for="for"><slot name="label" /></label>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.b-form-group {
    display: flex;
    align-items: center;
    column-gap: 8px;

    &:deep(input),
    &:deep(textarea) {
        text-align: left;
    }
}
</style>
