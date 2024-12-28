<template>
  <input
    :value="element.content.placeholder"
    :placeholder="element.content.placeholder"
    @input="updateContent($event)"
    class="focus:outline-none focus:border-green-500 border border-2"
    :style="{
      padding: element.styles.padding?.value,
      margin: element.styles.margin?.value,
      borderRadius: element.styles.borderRadius?.value,
      border: element.styles.border?.value,
      borderColor: element.styles.borderColor?.value,
    }"
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

const updateContent = (event) => {
  elementStore.updateElementProp(
    props.componentId, // Use props.componentId
    props.element.id,
    "content.placeholder",
    event.target.value
  );
};
</script>
