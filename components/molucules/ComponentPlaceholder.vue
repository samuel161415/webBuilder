<template>
  <section class="relative group">
    <div class="border-dashed border-2 border-gray-300 p-4 hover:bg-gray-100">
      <p class="text-gray-500 text-center">Component Placeholder</p>
    </div>
    <div
      class="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2"
    >
      <div class="h-0 border-t border-green-500 flex-1 mr-5"></div>
      <i
        class="pi pi-plus border border-green-500 text-center cursor-pointer text-green-500 p-1"
        @click="openModal"
      ></i>
      <div class="h-0 border-t border-green-500 flex-1 ml-5"></div>
    </div>
  </section>
</template>

<script>
import { useMainStore } from "@/stores/main";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useMainStore();
    const openModal = () => {
      store.setSelectedComponent(props.id);
      store.setModalVisibility(true);
    };
    return { openModal };
  },
};
</script>
