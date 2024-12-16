<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg md:w-1/2 flex flex-col items-center">
      <h3 class="text-xl font-bold mb-4">Select Component</h3>
      <ul class="flex flex-wrap justify-around">
        <li
          v-for="component in components"
          :key="component.id"
          class="cursor-pointer mb-2 border p-5 "
          @click="selectComponent(component)"
        >
          {{ component.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "@/stores/main";

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(["close"]);

const store = useMainStore();
const components = computed(() => {
  if (store.selectedComponentId.startsWith("placeholder1")) {
    return store.registeredComponents["Navigation"];
  } else if (store.selectedComponentId.startsWith("placeholder2")) {
    return store.registeredComponents["bodyComponent"];
  }
  return [];
});

const selectComponent = (component) => {
  store.replacePlaceholder(store.selectedPageId, store.selectedComponentId, component);
  emit("close");
};
</script>