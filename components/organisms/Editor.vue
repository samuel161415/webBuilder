<template>
  <div class="flex-1 h-full overflow-auto bg-white p-4">
    <div class="w-full relative flex justify-center py-1 border mb-2">
      <Button
        bgColor="bg-green-500"
        textColor="text-white"
        padding="px-10 py-2"
        width="w-50"
      >
        Publish
      </Button>
      <button
        class="w-10 h-10 right-1 rounded-full border flex justify-center items-center absolute text-gray-500"
      >
        <i class="pi pi-user"></i>
      </button>
    </div>

    <div
      v-if="pages.length === 0"
      class="h-[50vh] border flex justify-center items-center text-center text-gray-500"
    >
      Please add a page to create page content.
    </div>

    <div v-else class="space-y-4">
      <component
        v-for="component in currentPageContent"
        :is="componentMap[component.name]"
        :key="component.id"
        v-bind="component.props"
        @click="selectComponent(component)"
        @input="updateComponentProp(component.id, $event)"
      />
    </div>
    <ComponentModal :showModal="showModal" @close="closeModal" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "@/stores/main";
import NavigationPlaceholder from "@/components/molucules/NavigationPlaceholder.vue";
import NavigationOption from "@/components/molucules/NavigationOption.vue";
import ComponentPlaceholder from "@/components/molucules/ComponentPlaceholder.vue";
// import ComponentPlaceholder from "@/components/molucules/ComponentPlaceholder.vue";
// import FooterPlaceholder from "@/components/molucules/FooterPlaceholder.vue";
import Button from "@/components/atoms/Button.vue";
import ComponentModal from "@/components/organisms/ComponentModal.vue";
import Hero1 from "./Hero1.vue";
import Hero2 from "./Hero2.vue";
import Hero3 from "./Hero3.vue";
import SimpleBody from "./SimpleBody.vue";

const store = useMainStore();

const pages = computed(() => store.pages);
const currentPageContent = computed(() => store.currentPageContent);
const showModal = computed(() => store.showModal);

const componentMap = {
  Hero1,
  Hero2,
  Hero3,
  NavigationPlaceholder,
  ComponentPlaceholder,
  SimpleBody,
  // FooterPlaceholder,
};

const selectComponent = (component) => {
  console.log("clicking component from editor", component);
  store.setSelectedComponent(component.id);
};

const closeModal = () => {
  store.setModalVisibility(false);
};

const updateComponentProp = (componentId, event) => {
  console.log("updateComponentProp", componentId);
  const { key, value } = event;
  console.log("key, value", key, value);
  store.updateComponentProp(componentId, key, value);
};

watch(currentPageContent, (newValue) => {
  console.log("watch currentPageContent changed:", newValue);
});
</script>
