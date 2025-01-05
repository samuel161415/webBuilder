<template>
  <div
    class="absolute bottom-0 left-1/2 transform -translate-x-1/2 py-1 px-2 cursor-pointer justify-center items-center hidden group-hover:flex w-full transition-all duration-300 ease-in-out"
    @click="$emit('open')"
  >
    <div
      class="border-t border-green-500 h-1 w-1/2 transition-all duration-300 ease-in-out"
    />
    <i
      class="pi pi-plus text-green-500 p-1 border border-green-500 rounded mx-2 transition-all duration-300 ease-in-out"
    ></i>
    <div
      class="border-t border-green-500 h-1 w-1/2 transition-all duration-300 ease-in-out"
    />
  </div>
</template>

<script setup>
defineEmits(["open"]);
</script>
