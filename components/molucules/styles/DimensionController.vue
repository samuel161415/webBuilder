<template>
  <div>
    <label class="block font-medium mb-1">{{ label }}</label>
    <input
      type="text"
      :value="value"
      @input="$emit('update', $event.target.value)"
      class="w-full px-2 py-1 border border-gray-300 rounded"
      placeholder="e.g., 100px or 50%"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String }, //required: true
  value: { type: String, default: "auto" },
});
</script>
