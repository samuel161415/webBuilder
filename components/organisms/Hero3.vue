<template>
  <div :class="backgroundClass" class="p-8">
    <NavigationOption :navigationClass="navigationClass" />
    <div class="flex mt-8">
      <div class="w-1/2">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          :style="{ height: imageHeight }"
        />
      </div>
      <div class="w-1/2 text-center">
        <h1 class="text-4xl font-bold" :style="{ color: textColor }">
          {{ title }}
        </h1>
        <p class="mt-4 text-lg" :style="{ color: textColor }">
          {{ description }}
        </p>
        <!-- <Button :bgColor="buttonBgColor" :textColor="buttonTextColor">
          {{ buttonText }}
        </Button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import NavigationOption from "@/components/molucules/NavigationOption.vue";
import Button from "@/components/atoms/Button.vue";

const props = defineProps({
  backgroundClass: { type: String, default: "bg-gray-500" },
  navigationClass: { type: String, default: "flex justify-between" },
  textColor: { type: String, default: "#ffffff" },
  title: { type: String, default: "Hero Title" },
  description: { type: String, default: "This is a hero description." },
  imageSrc: { type: String, default: "/images/imbg.jpg" },
  imageAlt: { type: String, default: "Image description" },
  imageHeight: { type: String, default: "300px" },
  buttonBgColor: { type: String, default: "bg-blue-500" },
  buttonTextColor: { type: String, default: "text-white" },
  buttonText: { type: String, default: "Click Me" },
});


</script>