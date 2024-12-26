<template>
  <div class="flex items-center space-x-2">
    <!-- <i class="pi pi-palette text-gray-500"></i> -->
    <input
      type="color"
      :value="value"
      @input="$emit('update', $event.target.value)"
      class="w-10 h-10 rounded cursor-pointer"
    />
  </div>
</template>

<script setup>
console.log("am in color picker");
const props = defineProps({
  value: {
    type: String,
    // default: "#ffffff"
  },
});
</script>
