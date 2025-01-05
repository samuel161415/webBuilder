<template>
  <div
    :style="{
      backgroundImage: `url(${content.bgImageSource})`
    }"
    :class="isSelected ? 'border-2 border-dashed' : ''"
    class="bg-cover bg-center h-screen group"
  >
    <div
      class="bg-black h-full w-full bg-opacity-50 relative"
      :style="{
        padding: styles.padding.value,
        display: styles.mainBodyDisplay.value,
        justifyContent: styles.mainBodyJustify.value,
        alignItems: styles.mainBodyAlign.value,
        //opacity: styles.opacity.value,
      }"
    >
      <div class="text-center">
        <VueDraggableNext
          v-if="sections?.center.length > 0"
          :list="sections?.center"
          group="elements"
          class="flex flex-col "
        >
          <transition-group>
            <div
              v-for="(element, key) in sections?.center"
              :key="key"
              class="group/element relative"
            >
              <div
                class="hover:border border-gray-500 border-dashed p-2 relative group transition-all duration-300 ease-in-out"
              >
                <component
                  :is="getComponent(element.component)"
                  :element="element"
                  :componentId="componentId"
                  :section="'center'"
                />
                <div
                  class="group-hover:h-10 transition-all duration-300 ease-in-out"
                ></div>
                <ElementAdder
                  @open="() => openAddElementModal('center', key + 1)"
                />
                <button
                  class="absolute top-0 right-0 text-red-500 opacity-0 group-hover/element:opacity-100 transition-opacity duration-300 ease-in-out"
                  @click="
                    elementStore.removeElementFromComponent(
                      'center',
                      element.id
                    )
                  "
                >
                  <i class="pi pi-times"></i>
                </button>
              </div>
            </div>
          </transition-group>
        </VueDraggableNext>
        <div v-else class="relative w-full h-10">
          <ElementAdder @open="() => openAddElementModal('center', 0)" />
        </div>
      </div>
    </div>
    <ElementModal
      :showModal="showAddElementModal"
      @close="closeAddElementModal"
      :section="selectedSection"
      :position="selectedPosition"
    />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { defineEmits } from "vue";
import { useMainStore } from "@/stores/main";
import { useElementStore } from "@/stores/element";
import ElementModal from "@/components/organisms/ElementModal.vue";
import ElementAdder from "@/components/molecules/ElementAdder.vue";
import { VueDraggableNext } from "vue-draggable-next";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
  sections: { type: Object, required: true },
  componentId: { type: String, required: true },
});

const emit = defineEmits(["input"]);
const store = useMainStore();
const elementStore = useElementStore();

const showAddElementModal = ref(false);
const selectedSection = ref("");
const selectedPosition = ref(null);

const updateContent = (key, event) => {
  const value = event.target.innerText;
  emit("input", { key, value });
  store.updateComponentProp(props.componentId, `content.${key}`, value);
};

const openAddElementModal = (section, index) => {
  selectedSection.value = section;
  selectedPosition.value = index;
  showAddElementModal.value = true;
};

const closeAddElementModal = () => {
  showAddElementModal.value = false;
};

const isSelected = computed(
  () => store.selectedComponentId === props.componentId
);

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
