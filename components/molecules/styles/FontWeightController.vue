<template>
    <div>
      <select
        :value="value"
        @change="$emit('update', $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="bolder">Bolder</option>
        <option value="lighter">Lighter</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
        <option value="500">500</option>
        <option value="600">600</option>
        <option value="700">700</option>
        <option value="800">800</option>
        <option value="900">900</option>
      </select>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    value: { type: String, default: "normal" },
  });
  </script>