<template>
  <div>
    <div class="flex space-x-4">
      <div class="flex flex-col items-center">
        <label class="block font-medium mb-1">Top</label>
        <input
          type="number"
          v-model="topValue"
          class="w-20 px-2 py-1 border border-gray-300 rounded"
          placeholder="Value"
        />
        <select
          v-model="topUnit"
          class="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
      <div class="flex flex-col items-center">
        <label class="block font-medium mb-1">Right</label>
        <input
          type="number"
          v-model="rightValue"
          class="w-20 px-2 py-1 border border-gray-300 rounded"
          placeholder="Value"
        />
        <select
          v-model="rightUnit"
          class="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
      <div class="flex flex-col items-center">
        <label class="block font-medium mb-1">Bottom</label>
        <input
          type="number"
          v-model="bottomValue"
          class="w-20 px-2 py-1 border border-gray-300 rounded"
          placeholder="Value"
        />
        <select
          v-model="bottomUnit"
          class="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
      <div class="flex flex-col items-center">
        <label class="block font-medium mb-1">Left</label>
        <input
          type="number"
          v-model="leftValue"
          class="w-20 px-2 py-1 border border-gray-300 rounded"
          placeholder="Value"
        />
        <select
          v-model="leftUnit"
          class="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  value: {
    type: Object,
    default: () => ({ top: "0px", right: "0px", bottom: "0px", left: "0px" }),
  },
});

const emit = defineEmits(["update"]);

const topValue = ref(parseInt(props.value.top));
const topUnit = ref(props.value.top.replace(/[0-9]/g, "") || "px");
const rightValue = ref(parseInt(props.value.right));
const rightUnit = ref(props.value.right.replace(/[0-9]/g, "") || "px");
const bottomValue = ref(parseInt(props.value.bottom));
const bottomUnit = ref(props.value.bottom.replace(/[0-9]/g, "") || "px");
const leftValue = ref(parseInt(props.value.left));
const leftUnit = ref(props.value.left.replace(/[0-9]/g, "") || "px");

watch(
  [
    topValue,
    topUnit,
    rightValue,
    rightUnit,
    bottomValue,
    bottomUnit,
    leftValue,
    leftUnit,
  ],
  ([
    newTopValue,
    newTopUnit,
    newRightValue,
    newRightUnit,
    newBottomValue,
    newBottomUnit,
    newLeftValue,
    newLeftUnit,
  ]) => {
    const newValue = {
      top: newTopValue + newTopUnit,
      right: newRightValue + newRightUnit,
      bottom: newBottomValue + newBottomUnit,
      left: newLeftValue + newLeftUnit,
    };
    emit("update", newValue);
  }
);
</script>
