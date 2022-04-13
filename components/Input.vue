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

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue'])
function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <div class="font-bold mb-1">{{ props.title }}</div>
    <input
      v-bind="$attrs"
      :value="props.modelValue"
      @input="updateValue"
      class="block bg-gray-200 text-black rounded p-4 w-full"
      :class="{ 'cursor-not-allowed': attrs.disabled }"
    />
  </div>
</template>
