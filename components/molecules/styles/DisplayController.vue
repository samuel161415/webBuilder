<template>
  <div>
    <template v-if="checkIfKeyHas(propKey, 'display')">
      <select
        :value="value"
        disabled
        class="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
      >
        <option value="flex">Flex</option>
      </select>
    </template>
    <template v-else-if="checkIfKeyHas(propKey, 'justify')">
      <!-- <label class="block">Justify Content</label> -->
      <select
        :value="value"
        @change="handleFlexChange(propKey, $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option
          v-for="option in justifyContentOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
    <template v-else-if="checkIfKeyHas(propKey, 'align')">
      <label class="block">Align Items</label>
      <select
        :value="value"
        @change="handleFlexChange(propKey, $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option
          v-for="option in alignItemOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  propKey: { type: String, required: true },
  value: { type: String, required: true },
  secondType: { type: String, required: false },
});

const emit = defineEmits(["update"]);

const justifyContentOptions = ref([
  { value: "flex-start", label: "Justify Start (Left)" },
  { value: "flex-end", label: "Justify End (Right)" },
  { value: "center", label: "Justify Center" },
  { value: "space-between", label: "Justify Between" },
  { value: "space-around", label: "Justify Around" },
  { value: "space-evenly", label: "Justify Evenly" },
]);

const alignItemOptions = ref([
  { value: "flex-start", label: "Align Start (Top)" },
  { value: "flex-end", label: "Align End (Bottom)" },
  { value: "center", label: "Align Center" },
  { value: "baseline", label: "Align Baseline" },
  { value: "stretch", label: "Align Stretch" },
]);

const checkIfKeyHas = (key, value) => {
  const tempString = key.toLowerCase();
  return tempString.includes(value);
};
const handleFlexChange = (key, value) => {
  emit("update", { key, value });
};
</script>