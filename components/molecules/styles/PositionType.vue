<template>
    <div>
      <select
        :value="value"
        @change="$emit('update', $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="static">Static</option>
        <option value="relative">Relative</option>
        <option value="absolute">Absolute</option>
        <option value="fixed">Fixed</option>
        <option value="sticky">Sticky</option>
      </select>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    value: { type: String, default: "static" },
  });
  </script>