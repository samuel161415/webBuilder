<template>
  <div
    :style="{ backgroundImage: `url(${backgroundImage})`, height: height }"
    class="p-8 bg-cover bg-center"
  >
    <NavigationOption :navigationClass="navigationClass" />
    <h1>What </h1>
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
    backgroundImage: { type: String, default: "/images/imbg.jpg" },
    height: { type: String, default: "500px" },
    navigationClass: { type: String, default: "flex justify-between" },
    textColor: { type: String, default: "text-blue-500" },
    title: { type: String, default: "Hero Title" },
    description: { type: String, default: "This is a hero description." },
  },
};
</script>
