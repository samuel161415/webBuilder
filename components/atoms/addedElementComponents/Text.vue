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
  onClick: Function,
});

const elementStore = useElementStore();
const store = useMainStore();

const handleClick = () => {
  if (props.onClick) props.onClick();
};

const updateContent = (event) => {
  elementStore.updateElementProp(
    store.selectedComponentId,
    props.element.id,
    "content.title",
    event.target.innerText
  );
};
</script>
