<template>
    <p :class="textClass" @click="handleClick">
      <slot />
    </p>
  </template>
  
  <script>
  export default {
    props: {
      textClass: {
        type: String,
        default: "text-base text-black",
      },
      onClick: Function,
    },
    methods: {
      handleClick() {
        if (this.onClick) this.onClick();
      },
    },
  };
  </script>