<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: unknown
  title: string
}>()

const emit = defineEmits(['update:modelValue'])
function updateValue (event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <div class="font-bold mb-1">{{ props.title }}</div>
    <input v-bind="$attrs" :value="props.modelValue" @input="updateValue" class="bg-gray-200 text-black rounded p-4 w-full" />
  </div>
</template>
