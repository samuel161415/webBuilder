<template>
  <div>
    <label class="block font-medium mb-1">Display</label>
    <select
      :value="value"
      @change="$emit('update', $event.target.value)"
      class="w-full px-2 py-1 border border-gray-300 rounded"
    >
      <option value="block">Block</option>
      <option value="inline">Inline</option>
      <option value="flex">Flex</option>
      <option value="grid">Grid</option>
    </select>
    <div v-if="value === 'flex'" class="mt-2 space-y-2">
      <label class="block">Flex Options</label>
      <select
        :value="alignItems"
        @change="
          $emit('update', { key: 'alignItems', value: $event.target.value })
        "
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="items-start">Align Start</option>
        <option value="items-center">Align Center</option>
        <option value="items-end">Align End</option>
      </select>
      <select
        :value="justifyContent"
        @change="
          $emit('update', { key: 'justifyContent', value: $event.target.value })
        "
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="justify-start">Justify Start</option>
        <option value="justify-center">Justify Center</option>
        <option value="justify-between">Justify Between</option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: String, default: "block" },
  alignItems: { type: String, default: "items-start" },
  justifyContent: { type: String, default: "justify-start" },
});
</script>
