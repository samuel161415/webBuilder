<template>
  <div>
    <select
      :value="value"
      @change="$emit('update', $event.target.value)"
      class="w-full px-2 py-1 border border-gray-300 rounded"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: String, default: "" }
});
</script>
