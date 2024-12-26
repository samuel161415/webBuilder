<template>
  <div>
    <!-- <label class="block font-medium mb-1">Display</label> -->
    <select
      :value="value"
      disabled
      class="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
    >
      <option value="flex">Flex</option>
    </select>
    <div class="mt-2 space-y-2">
      <label class="block">Flex Direction</label>
      <select
        :value="currentFlexDirection"
        @change="handleFlexChange('flexDirection', $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="row">Row</option>
        <option value="row-reverse">Row Reverse</option>
        <option value="column">Column</option>
        <option value="column-reverse">Column Reverse</option>
      </select>
      <label class="block">Flex Wrap</label>
      <select
        :value="flexWrap"
        @change="handleFlexChange('flexWrap', $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="nowrap">No Wrap</option>
        <option value="wrap">Wrap</option>
        <option value="wrap-reverse">Wrap Reverse</option>
      </select>
      <label class="block">Align Items</label>
      <select
        :value="alignItems"
        @change="handleFlexChange('alignItems', $event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option
          v-for="option in alignItemsOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <label class="block">Justify Content</label>
      <select
        :value="justifyContent"
        @change="handleFlexChange('justifyContent', $event.target.value)"
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  value: { type: String, default: "flex" },
  flexDirection: { type: String, default: "row" },
  flexWrap: { type: String, default: "nowrap" },
  alignItems: { type: String, default: "items-start" },
  justifyContent: { type: String, default: "justify-start" },
});

const emit = defineEmits(["update"]);
const currentFlexDirection = ref(props.flexDirection || "row");

const alignItemsOptions = ref([]);
const justifyContentOptions = ref([]);

// Update options when flex direction changes
const updateOptions = (direction) => {
  if (direction === "row" || direction === "row-reverse") {
    alignItemsOptions.value = [
      { value: "items-start", label: "Align Start (Top)" }, // Align to top
      { value: "items-center", label: "Align Center (Middle)" }, // Center vertically
      { value: "items-end", label: "Align End (Bottom)" }, // Align to bottom
      { value: "items-baseline", label: "Align Baseline" }, // Align based on text baseline
      { value: "items-stretch", label: "Align Stretch" }, // Stretch to fill container
    ];
    justifyContentOptions.value = [
      { value: "justify-start", label: "Justify Start (Left)" }, // Align left
      { value: "justify-end", label: "Justify End (Right)" }, // Align right
      { value: "justify-center", label: "Justify Center" }, // Center horizontally
      { value: "justify-between", label: "Justify Between" }, // Equal space between items
      { value: "justify-around", label: "Justify Around" }, // Space around items
      { value: "justify-evenly", label: "Justify Evenly" }, // Equal space around and between
    ];
  } else {
    alignItemsOptions.value = [
      { value: "items-start", label: "Align Start (Left)" }, // Align to left
      { value: "items-center", label: "Align Center (Middle)" }, // Center horizontally
      { value: "items-end", label: "Align End (Right)" }, // Align to right
      { value: "items-baseline", label: "Align Baseline" }, // Align based on text baseline
      { value: "items-stretch", label: "Align Stretch" }, // Stretch to fill horizontally
    ];
    justifyContentOptions.value = [
      { value: "justify-start", label: "Justify Start (Top)" }, // Align to top
      { value: "justify-end", label: "Justify End (Bottom)" }, // Align to bottom
      { value: "justify-center", label: "Justify Center" }, // Center vertically
      { value: "justify-between", label: "Justify Between" }, // Equal space between items
      { value: "justify-around", label: "Justify Around" }, // Space around items
      { value: "justify-evenly", label: "Justify Evenly" }, // Equal space around and between
    ];
  }

};

// Watch for changes in flex direction
watch(currentFlexDirection, (newVal) => {
  updateOptions(newVal);
});

// Initialize options on mount
updateOptions(currentFlexDirection.value);

const handleFlexChange = (key, value) => {
  currentFlexDirection.value = value; // Ensure the flex direction is updated
  emit("update", { key, value });
};
</script>
