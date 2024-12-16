<template>
  <div :class="backgroundClass" class="p-8">
    <NavigationOption :navigationClass="navigationClass" />
    <div class="text-center mt-8">
      <h1 class="text-4xl font-bold" :style="{ color: textColor }">
        {{ title }}
      </h1>
      <p class="mt-4 text-lg" :style="{ color: textColor }">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import NavigationOption from "@/components/molucules/NavigationOption.vue";
export default {
  components: { NavigationOption },
  props: {
    backgroundClass: { type: String, default: "bg-blue-500" },
    navigationClass: { type: String, default: "flex justify-between" },
    textColor: { type: String, default: "#ffffff" },
    title: { type: String, default: "Hero Title" },
    description: { type: String, default: "This is a hero description." },
  },
};
</script>
