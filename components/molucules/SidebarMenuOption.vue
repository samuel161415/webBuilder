<template>
  <div class="mt-3">
    <ul class="flex w-full">
      <li class="w-1/2" v-for="(item, index) in menuItems" :key="item.label">
        <Button
          :textColor="'text-black'"
          :bgColor="selectedIndex === index ? 'bg-blue-400' : 'bg-white'"
          :padding="'px-2 py-1'"
          :borderRadius="''"
          :width="'w-full'"
          :isSelected="selectedIndex === index"
          @click="() => handleClick(index)"
        >
          {{ item.label }}
        </Button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import Button from "@/components/atoms/Button.vue";

// Props
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});

// Track selected index
const selectedIndex = ref(0);

// Pinia store
const store = useMainStore();

// Watch for changes in the sidebar mode and update the selected index
watch(
  () => store.sidebarMode,
  (newMode) => {
    selectedIndex.value = props.menuItems.findIndex(
      (item) => item.label.toLowerCase() === newMode
    );
  }
);

// Handle button click
const handleClick = (index) => {
  selectedIndex.value = index;
  const mode = props.menuItems[index].label.toLowerCase();
  store.setSidebarMode(mode);
};
</script>
