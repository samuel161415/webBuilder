<template>
    <div>
      <label class="block font-medium mb-1">Font Size</label>
      <select
        :value="fontSize"
        @change="$emit('update', { key: 'fontSize', value: $event.target.value })"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="text-sm">Small</option>
        <option value="text-base">Base</option>
        <option value="text-lg">Large</option>
        <option value="text-xl">XL</option>
      </select>
      <label class="block font-medium mb-1 mt-2">Font Weight</label>
      <select
        :value="fontWeight"
        @change="$emit('update', { key: 'fontWeight', value: $event.target.value })"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="font-normal">Normal</option>
        <option value="font-semibold">Semi-bold</option>
        <option value="font-bold">Bold</option>
      </select>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    fontSize: { type: String, default: "text-base" },
    fontWeight: { type: String, default: "font-normal" },
  });
  </script>
  