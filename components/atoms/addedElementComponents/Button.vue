<template>
  <button
    :style="{
      padding: `${element.styles.paddingVertical.value} ${element.styles.paddingHorizontal.value}`,
      margin: element.styles.margin?.value,
      borderRadius: element.styles.borderRadius?.value,
      color: element.styles.textColor?.value,
      backgroundColor: element.styles.buttonBgColor?.value,
    }"
    class="focus:outline-none focus:border-green-500"
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
  onClick: Function, // Click handler
});

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
    event.target.innerText
  );
};
</script>
