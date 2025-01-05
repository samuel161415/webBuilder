<template>
  <h1
    :style="{
      padding: `${element.styles?.paddingY?.value} ${element.styles?.paddingX?.value}`,
      margin: `${element.styles?.marginY?.value} ${element.styles?.marginX?.value}`,
      color: element.styles?.textColor?.value,
      fontSize: element.styles?.fontSize?.value,
      fontStyle: element.styles?.fontStyle?.value,
      fontWeight: element.styles?.fontWeight?.value,
      textAlign: element.styles?.textAlign?.value,
    }"
    class="focus:outline-none focus:border-green-500"
    @click="handleClick"
    contenteditable="true"
    @input="updateContent($event)"
  >
    {{ element.content.title }}
  </h1>
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
  section: {
    type: String,
    required: true,
  },
  onClick: Function,
});

const elementStore = useElementStore();
const store = useMainStore();

const handleClick = () => {
  if (props.onClick) props.onClick();
};

const updateContent = (event) => {
  elementStore.updateElementProp(
    props.componentId, // Use props.componentId
    props.element.id,
    "content.title",
    event.target.innerText,
    props.section // Pass the section
  );
};
</script>
