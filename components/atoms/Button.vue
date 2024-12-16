<template>
  <button
    :class="[
      baseClasses,
      padding,
      width,
      borderRadius,
      textColor,
      bgColor,
      borderColor,
      margin,
      isSelected ? selectedClasses : defaultClasses,
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: "bg-white", // Default background color
    },
    textColor: {
      type: String,
      default: "text-black", // Default text color
    },
    padding: {
      type: String,
      default: "px-4 py-2", // Default padding
    },
    borderRadius: {
      type: String,
      default: "rounded", // Default border radius
    },
    width: {
      type: String,
      default: "w-full", // Default width
    },
    isSelected: {
      type: Boolean,
      default: false, // Determines if the button is selected
    },
    borderColor: {
      type: String,
      default: "border border-gray-300", // Default border color
    },
    margin:{
      type: String,
      default: "m-0",
    },
    onClick: Function, // Click handler
  },
  computed: {
    baseClasses() {
      return "transition duration-200 font-medium focus:outline-none";
    },
    selectedClasses() {
      return "bg-blue-400 text-white"; // Styles for the selected button
    },
    defaultClasses() {
      return "hover:bg-gray-200"; // Styles for non-selected buttons
    },
  },
  methods: {
    handleClick() {
      if (this.onClick) this.onClick();
    },
  },
};
</script>
