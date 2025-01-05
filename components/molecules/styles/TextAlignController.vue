<template>
    <div>
      <div class="flex space-x-2">
        <i
          class="pi pi-align-left cursor-pointer"
          :class="{ 'text-blue-500': value === 'left' }"
          @click="$emit('update', 'left')"
        ></i>
        <i
          class="pi pi-align-center cursor-pointer"
          :class="{ 'text-blue-500': value === 'center' }"
          @click="$emit('update', 'center')"
        ></i>
        <i
          class="pi pi-align-right cursor-pointer"
          :class="{ 'text-blue-500': value === 'right' }"
          @click="$emit('update', 'right')"
        ></i>
        <i
          class="pi pi-align-justify cursor-pointer"
          :class="{ 'text-blue-500': value === 'justify' }"
          @click="$emit('update', 'justify')"
        ></i>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    value: { type: String, default: "left" },
  });
  </script>