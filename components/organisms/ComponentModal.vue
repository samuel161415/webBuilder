<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-white rounded-lg overflow-hidden md:w-3/4 flex flex-col items-center"
    >
      <section
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-100 border border-gray-300"
      >
        <span class="text-gray-700">Add Component</span>
        <button
          class="w-6 h-6 rounded-full flex justify-center items-center border border-gray-700 hover:scale-105 transform transition duration-300"
        >
          <i
            class="pi pi-times text-gray-500 cursor-pointer"
            @click="handleClose"
          ></i>
        </button>
      </section>

      <div class="flex w-full p-4">
        <!-- Left Side -->
        <div class="w-1/3 pr-2">
          <div
            class="flex items-center mb-4 border border-gray-300 rounded overflow-hidden focus-within:border-blue-500"
          >
            <i class="pi pi-search text-gray-500 px-3"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search components"
              class="w-full px-4 py-2 focus:outline-none border-none"
            />
          </div>
          <ul class="flex flex-wrap justify-around ">
            <li
              v-for="component in filteredComponents"
              :key="component.id"
              class="cursor-pointer mb-2 border py-3 rounded text-center w-full hover:bg-gray-300 transition-all duration-300"
              @click="selectComponent(component)"
            >
              {{ component.name }}
            </li>
          </ul>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded mt-4"
            @click="handleClose"
          >
            Abort
          </button>
        </div>

        <!-- Right Side -->
        <div class="w-2/3 pl-2">
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="component in filteredComponents"
              :key="component.id"
              class="border p-2"
            >
              <img
                :src="component.image"
                :alt="component.name"
                class="w-full h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "@/stores/main";

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(["close"]);

const store = useMainStore();
const searchQuery = ref("");

const components = computed(() => {
  if (
    store.selectedComponentId &&
    store.selectedComponentId.startsWith("placeholder1")
  ) {
    return store.registeredComponents["Navigation"];
  } else if (
    store.selectedComponentId &&
    store.selectedComponentId.startsWith("placeholder2")
  ) {
    return store.registeredComponents["bodyComponent"];
  }
  return [];
});

const filteredComponents = computed(() => {
  return components.value.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectComponent = (component) => {
  store.replacePlaceholder(
    store.selectedPageId,
    store.selectedComponentId,
    component
  );
  emit("close");
};

const handleClose = () => {
  emit("close");
};
</script>
