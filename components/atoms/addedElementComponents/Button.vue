<template>
  <button
    :style="{
      padding: `${element.styles?.paddingY?.value} ${element.styles?.paddingX?.value}`,
      margin: `${element.styles?.marginY?.value} ${element.styles?.marginX?.value}`,
      borderRadius: element.styles?.borderRadius?.value,
      color: element.styles?.textColor?.value,
      backgroundColor: element.styles?.buttonBgColor?.value,
      color: element.styles?.buttonTextColor?.value,
    }"
    class="focus:outline-none focus:border-green-500 "
    @click="handleClick"
    contenteditable="true"
    @input="updateContent($event)"
  >
    {{ element.content.text }}
  </button>
</template>

<script setup>
import { useElementStore } from "@/stores/element";
import { computed } from "vue";

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  componentId: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false, // Determines if the button is selected
  },
  section: {
    type: String,
    required: true,
  },
  onClick: Function, // Click handler
});

console.log("prop data in button ", props.element);

const elementStore = useElementStore();
const store = useMainStore();

const baseClasses = computed(
  () => "transition duration-200 font-medium focus:outline-none"
);
const selectedClasses = computed(() => "bg-blue-400 text-white"); // Styles for the selected button
const defaultClasses = computed(() => "hover:bg-gray-200"); // Styles for non-selected buttons

const handleClick = () => {
  if (props.onClick) props.onClick();
};

const updateContent = (event) => {
  elementStore.updateElementProp(
    props.componentId, // Use props.componentId
    props.element.id,
    "content.text",
    event.target.innerText,
    props.section // Pass the section
  );
};
</script>
