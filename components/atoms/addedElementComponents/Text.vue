<template>
  <p
    :style="{
      color: element.styles?.textColor?.value,
      fontSize: element.styles.fontSize?.value,
    }"
    class="focus:outline-none focus:border-green-500"
    @click="handleClick"
    contenteditable="true"
    @input="updateContent($event)"
  >
    {{ element.content.title }}
  </p>
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
    event.target.innerText
  );
};
</script>
