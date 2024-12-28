<template>
  <div
    :style="{
      backgroundImage: `url(${content.bgImageSource})`,
      height: styles.bodyHeight.value,
    }"
    class="bg-cover bg-center h-screen"
  >
    <div
      class="bg-black h-full w-full bg-opacity-50"
      :style="{
        padding: styles.padding.value,
        display: styles.mainBodyDisplay.value,
        justifyContent: styles.mainBodyJustify.value,
        alignItems: styles.mainBodyAlign.value,
        //opacity: styles.opacity.value,
      }"
    >
      <div class="text-center">
        <h1
          :style="{ color: styles.textColor.value }"
          class="text-4xl font-bold mb-4 focus:outline-none focus:border-green-500"
          contenteditable="true"
          @input="updateContent('title', $event)"
        >
          {{ content.title }}
        </h1>
        <h2
          :style="{ color: styles.textColor.value }"
          class="text-2xl font-semibold mb-2 focus:outline-none focus:border-green-500"
          contenteditable="true"
          @input="updateContent('subtitle', $event)"
        >
          {{ content.subtitle }}
        </h2>
        <p
          :style="{ color: styles.textColor.value }"
          class="text-lg mb-4 focus:outline-none focus:border-green-500"
          contenteditable="true"
          @input="updateContent('description', $event)"
        >
          {{ content.description }}
        </p>
        <button
          :style="{
            backgroundColor: styles.buttonBgColor.value,
            color: styles.buttonTextColor.value,
            padding: `${styles.paddingVertical.value} ${styles.paddingHorizontal.value}`,
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
        <div
          class="border border-red-500 flex flex-col min-h-[100px] min-w-[100px]"
        >
          <component
            v-for="(element, key) in addedElements"
            :is="componentMap[element.component]"
            :key="key"
            :element="element"
            :componentId="componentId"
          />
        </div>

        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
          @click="openAddElementModal"
        >
          <i class="pi pi-plus text-green-500"></i>
        </div>
      </div>
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
import ElementModal from "@/components/organisms/ElementModal.vue";
import Button from "@/components/atoms/addedElementComponents/Button.vue";
import Text from "@/components/atoms/addedElementComponents/Text.vue";
import Input from "@/components/atoms/addedElementComponents/Input.vue";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
  componentId: { type: String, required: true },
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
  store.updateComponentProp(props.componentId, `content.${key}`, value);
};

const openAddElementModal = () => {
  showAddElementModal.value = true;
};

const closeAddElementModal = () => {
  showAddElementModal.value = false;
};

const currentContent = computed(() => {
  const page = store.pages.find((p) => p.id === store.selectedPageId);
  const component = page?.content.find((c) => c.id === props.componentId);
  return component ? component.props.content : {};
});

const addedElements = computed(() => {
  const page = store.pages.find((p) => p.id === store.selectedPageId);
  const component = page?.content.find((c) => c.id === props.componentId);
  return component ? component.props.added_elements : [];
});
</script>
