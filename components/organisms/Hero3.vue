<template>
  <div
    :style="{ backgroundColor: styles.backgroundColor.value }"
    class="p-8 border border-red-500"
  >
    <NavigationOption
      :navigationClass="styles.navigationDisplay.value"
      :navigationJustify="styles.navigationJustify.value"
      :navigationColor="styles.navigationColor.value"
      :items="content.items"
    />
    <div
      :style="{
        display: styles.display.value,
        flexDirection: styles.flexDirection.value,
        flexWrap: styles.flexWrap.value,
        alignItems: styles.alignItems.value,
        justifyContent: styles.justifyContent.value,
      }"
      class="mt-8 border border-blue-500 relative group"
    >
      <div
        class="relative w-1/2 text-center flex flex-col justify-center items-center px-5 pb-8 relative"
      >
        <h1
          class="text-4xl font-bold focus:outline-none focus:border-green-500"
          :style="{ color: styles.textColor.value }"
          contenteditable="true"
          @input="updateContent('title', $event)"
        >
          {{ content.title }}
        </h1>
        <p
          class="my-4 text-lg focus:outline-none focus:border-green-500"
          :style="{ color: styles.textColor.value }"
          contenteditable="true"
          @input="updateContent('description', $event)"
        >
          {{ content.description }}
        </p>

        <button
          :style="{
            backgroundColor: styles.buttonBgColor.value,
            color: styles.buttonTextColor.value,
            padding: styles.buttonPadding.value,
          }"
          class="rounded"
        >
          <div
            class="focus:outline-none focus:border-green-500"
            contenteditable="true"
            @input="updateContent('buttonText', $event)"
          >
            {{ content.buttonText }}
          </div>
        </button>

        <!-- Render selected elements -->
        <div
          class="border border-red-500 flex flex-col min-h-[100px] min-w-[100px]"
        >
          <component
            v-for="(element, key) in addedElements"
            :is="componentMap[element.component]"
            :key="key"
            :element="element"
          />
        </div>

        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          @click="openAddElementModal"
        >
          <i class="pi pi-plus text-green-500"></i>
        </div>
      </div>
      <div class="w-1/2 px-5 rounded-xl overflow-hidden">
        <img
          :src="content.imageSrc"
          :alt="content.imageAlt"
          :style="{
            height: styles.imageHeight.value,
            width: styles.imageWidth.value,
            borderRadius: styles.imageBorderRadius.value,
          }"
        />
      </div>
      <!-- Add Icon -->
    </div>
    <ElementModal
      :showModal="showAddElementModal"
      @close="closeAddElementModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineEmits } from "vue";
import { useMainStore } from "@/stores/main";
import NavigationOption from "@/components/molucules/NavigationOption.vue";
import ElementModal from "@/components/organisms/ElementModal.vue";
import Button from "@/components/atoms/addedElementComponents/Button.vue";
import Text from "@/components/atoms/addedElementComponents/Text.vue";
import Input from "@/components/atoms/addedElementComponents/Input.vue";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
});

const emit = defineEmits(["input"]);
const store = useMainStore();

const componentMap = {
  Button,
  Text,
  Input,
};

const showAddElementModal = ref(false);

const updateContent = (key, event) => {
  const value = event.target.innerText;
  emit("input", { key, value });
  store.updateComponentProp(store.selectedComponentId, `content.${key}`, value);
};

const openAddElementModal = () => {
  showAddElementModal.value = true;
};

const closeAddElementModal = () => {
  showAddElementModal.value = false;
};

const currentContent = computed(() => {
  const page = store.pages.find((p) => p.id === store.selectedPageId);
  const component = page?.content.find(
    (c) => c.id === store.selectedComponentId
  );
  return component ? component.props.content : {};
});

const addedElements = computed(() => {
  const page = store.pages.find((p) => p.id === store.selectedPageId);
  const component = page?.content.find(
    (c) => c.id === store.selectedComponentId
  );
  return component ? component.props.added_elements : [];
});
</script>
