<template>
    <nav :class="navigationClass">
      <ul class="flex space-x-4">

        <li v-for="(item, index) in items" :key="index">
          <a href="#" class="text-white">{{ item }}</a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      navigationClass: {
        type: String,
        default: "flex justify-between",
      },
      items: {
        type: Array,
        default: () => ["Home", "About", "Contact"],
      },
    },
  };
  </script>