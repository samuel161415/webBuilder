<template>
  <div>
    <select
      :value="value"
      @change="handleStyleChange($event.target.value)"
      class="w-full px-2 py-1 border border-gray-300 rounded"
    >
      <option value="center">Center</option>
      <option value="top">Top</option>
      <option value="left">Left</option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: String, required: true },
});

const emit = defineEmits(["update"]);

const handleStyleChange = (newValue) => {
  emit("update", newValue);
};
</script>
