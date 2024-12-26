<template>
  <div>
    <label class="block font-medium mb-1">{{ label }}</label>
    <div class="flex items-center space-x-2">
      <input
        type="number"
        v-model="numericValue"
        class="w-20 px-2 py-1 border border-gray-300 rounded"
        placeholder="Value"
      />
      <select
        v-model="unitValue"
        class="px-2 py-1 border border-gray-300 rounded"
      >
        <option value="px">px</option>
        <option value="%">%</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: { type: String, 
    // required: true 
  },
  value: { type: String, default: "0px" },
});

const emit = defineEmits(["update"]);

const numericValue = ref(parseInt(props.value));
const unitValue = ref(props.value.replace(/[0-9]/g, "") || "px");

watch([numericValue, unitValue], ([newNumericValue, newUnitValue]) => {
  const fullValue = newNumericValue + newUnitValue;
  emit("update", fullValue);
});
</script>
