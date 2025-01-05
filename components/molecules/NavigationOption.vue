<template>
  <nav 
  :style="{backgroundColor: navigationBackgroundColor, display: navigationClass, justifyContent: navigationJustify }"
  class="p-4">
    <a href="#" :style="{ color: navigationColor }">Logo</a>
    <ul class="flex space-x-4">
      <li v-for="(page, index) in pages" :key="index">
        <a :href="`/${page.route}`" :style="{ color: navigationColor }">{{ page.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, watch } from "vue";
import { useMainStore } from "@/stores/main";

const props = defineProps({
  navigationClass: { type: String, default: "flex" },
  navigationJustify: { type: String, default: "space-between" },
  navigationColor: { type: String, default: "#000000" },
  navigationBackgroundColor: { type: String, default: "#ffffff" },
});

const store = useMainStore();
const pages = computed(() => store.pages);

watch(
  () => props.navigationJustify,
  (newValue, oldValue) => {
    console.log(`navigationJustify changed from ${oldValue} to ${newValue}`);
  }
);
</script>