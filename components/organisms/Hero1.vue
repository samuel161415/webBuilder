<template>
  <div
    :style="{
      backgroundColor: styles.backgroundColor.value,
      //height: styles.height.value,
    }"
    :class="isSelected ? 'border-2 border-dashed' : ''"
    class="p-8"
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
        alignItems: styles.alignItems.value,
        justifyContent: styles.justifyContent.value,
      }"
      class="mt-8 relative group"
    >
      <div
        class="text-center flex flex-col justify-center items-center px-5 pb-8"
      >
        <h1
          class="text-4xl font-bold italic focus:outline-none focus:border-green-500"
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
          class=" flex flex-col min-h-[100px] min-w-[100px]"
        >
          <component
            v-for="(element, key) in addedElements"
            :is="getComponent(element.component)"
            :key="key"
            :element="element"
            :componentId="componentId"
          />
        </div>

        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 py-1 px-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
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
import { ref, computed, defineAsyncComponent } from "vue";
import { defineEmits } from "vue";
import { useMainStore } from "@/stores/main";
import NavigationOption from "@/components/molucules/NavigationOption.vue";
import ElementModal from "@/components/organisms/ElementModal.vue";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
  componentId: { type: String, required: true },
});
console.log("componentId of the hero1 element", props.componentId);

const emit = defineEmits(["input"]);
const store = useMainStore();

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

const isSelected = computed(() => store.selectedComponentId === props.componentId);

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

const getComponent = (componentName) => {
  return defineAsyncComponent(() =>
    import(`@/components/atoms/addedElementComponents/${componentName}.vue`)
  );
};
</script>
