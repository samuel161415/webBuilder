<template>
  <nav :style="{ display: navigationClass, justifyContent: navigationJustify }">
    <a href="#" :style="{ color: navigationColor }">Logo</a>
    <ul class="flex space-x-4">
      <li v-for="(item, index) in items" :key="index">
        <a href="#" :style="{ color: navigationColor }">{{ item }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  navigationClass: { type: String, default: "flex" },
  navigationJustify: { type: String, default: "space-between" },
  navigationColor: { type: String, default: "#000000" },
  items: { type: Array, default: () => ["Home", "About", "Contact"] },
});
</script>
