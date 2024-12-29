<template>
  <div class="flex-1 h-full overflow-auto bg-white p-4">
    <div class="w-full relative flex justify-center items-center py-1 border mb-2">
      <button
        class="ml-2 w-8 h-8 rounded-full border flex justify-center items-center text-gray-500 mr-5"
        @click="togglePreview"
      >
        <i :class="previewMode ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
      </button>
      <Button
        bgColor="bg-green-500"
        textColor="text-white"
        padding="px-10 py-2"
        width="w-50"
      >
        Publish
      </Button>

      <button
        class="w-8 h-8 right-1 rounded-full border flex justify-center items-center absolute text-gray-500"
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

const previewMode = ref(false);
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
  store.setSelectedComponent(component.id);
};

const closeModal = () => {
  store.setModalVisibility(false);
};

const updateComponentProp = (componentId, event) => {
  const { key, value } = event;
  store.updateComponentProp(componentId, key, value);
};
const togglePreview = () => {
  previewMode.value = !previewMode.value;
};
</script>
