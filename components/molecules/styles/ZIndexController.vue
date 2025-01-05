<template>
  <div>
    <input
      type="number"
      v-model="zIndex"
      class="w-full px-2 py-1 border border-gray-300 rounded"
      placeholder="0"
      min="0"
      max="999"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  value: { type: Number, default: 0 },
});

const emit = defineEmits(["update"]);

const zIndex = ref(props.value);

watch(zIndex, (newValue) => {
  emit("update", newValue);
});
</script>
