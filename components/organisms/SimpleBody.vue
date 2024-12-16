<template>
    <div class="p-8 bg-white shadow rounded-lg">
      <h1>Arege besibat</h1>
      <h1 class="text-4xl font-bold mb-4" :style="{ color: textColor }">
        {{ title }}
      </h1>
      <h2 class="text-2xl font-semibold mb-2" :style="{ color: textColor }">
        {{ subtitle }}
      </h2>
      <p class="text-lg mb-4" :style="{ color: textColor }">
        {{ description }}
      </p>
      <Button :bgColor="buttonBgColor" :textColor="buttonTextColor">
        {{ buttonText }}
      </Button>
    </div>
  </template>
  
  <script setup>
  import Button from "@/components/atoms/Button.vue";
  
  const props = defineProps({
    title: { type: String, default: "Simple Body Title" },
    subtitle: { type: String, default: "Simple Body Subtitle" },
    description: { type: String, default: "This is a simple body description." },
    textColor: { type: String, default: "#000000" },
    buttonBgColor: { type: String, default: "bg-blue-500" },
    buttonTextColor: { type: String, default: "text-white" },
    buttonText: { type: String, default: "Click Me" },
  });
  </script>