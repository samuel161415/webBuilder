<template>
  <img
    :src="element.content.imageSrc"
    :alt="element.content.alt"
    :style="{
      height: element.styles.imageHeight?.value,
      width: element.styles.imageWidth?.value,
      borderRadius: element.styles.imageBorderRadius?.value,
      position: element.styles.position?.value,
      zIndex: element.styles.zIndex?.value
    }"
    class="focus:outline-none focus:border-green-500"
  />
</template>

<script setup>
import { useElementStore } from "@/stores/element";

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  componentId: {
    type: String,
    required: true,
  },
});

const elementStore = useElementStore();
const store = useMainStore();

const coordinates = computed(() => {
  const coords = element.styles.coordinates?.value.split(" ") || [
    "0px",
    "0px",
    "0px",
    "0px",
  ];
  return coords;
});
</script>
