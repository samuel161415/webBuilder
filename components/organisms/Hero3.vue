<template>
  <div
    :style="{ backgroundColor: styles.backgroundColor?.value }"
    :class="isSelected ? 'border-2 border-dashed' : ''"
    class="pb-8 group"
  >
    <NavigationOption
      :navigationClass="styles.navigationDisplay?.value"
      :navigationJustify="styles.navigationJustify?.value"
      :navigationColor="styles.navigationColor?.value"
      :navigationBackgroundColor="styles.navigationBackgroundColor?.value"
      :items="content.items"
    />
    <div
      :style="{
        display: styles.display?.value,
        flexDirection: styles.flexDirection?.value,
        flexWrap: styles.flexWrap?.value,
        alignItems: styles.alignItems?.value,
        justifyContent: styles.justifyContent?.value,
      }"
      class="mt-8 px-8 relative group"
    >
      <div
        class="relative w-1/2 text-center flex flex-col justify-center items-center md:p-5 pb-8 h-full"
      >
        <!-- Render selected elements -->

          <VueDraggableNext
            v-if="sections?.left.length > 0"
            :list="sections?.left"
            group="elements"
            class="w-full"
          >
            <transition-group>
              <div
                v-for="(element, key) in sections?.left"
                :key="key"
                class="group/element relative w-full "
              >
                <div
                  class="hover:border border-gray-500 border-dashed p-2 relative group transition-all duration-300 ease-in-out"
                >
                  <component
                    :is="getComponent(element.component)"
                    :element="element"
                    :componentId="componentId"
                    :section="'left'"
                  />
                  <div class="group-hover:h-10 transition-all duration-300 ease-in-out"></div>
                  <ElementAdder
                    @open="() => openAddElementModal('left', key + 1)"
                  />
                  <button
                    class="absolute top-0 right-0 text-red-500 opacity-0 group-hover/element:opacity-100 transition-opacity duration-300 ease-in-out"
                    @click="
                      elementStore.removeElementFromComponent(
                        'left',
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
          <div v-else class="relative w-full  h-10"><ElementAdder  @open="() => openAddElementModal('left', 0)" /></div>
      

        <!-- <ElementAdder @open="() => openAddElementModal('left', key)" /> -->
      </div>
      <div class="w-1/2 px-5 rounded-xl overflow-hidden relative">
        <div
          class="flex flex-col justify-center  h-full relative"
          :style="{
            backgroundImage: `url(${content?.imageSrc})`,
            backgroundSize: styles.backgroundSize?.value,
            backgroundPosition: styles.backgroundPosition?.value,
          }"
        >
          <div
            class="bg-black h-full w-full bg-opacity-50 relative md:p-5 flex flex-col justify-center items-center"
          >
            <VueDraggableNext v-if="sections?.right.length > 0" :list="sections?.right" group="elements" class="w-full">
              <transition-group>
                <div
                  v-for="(element, key) in sections?.right"
                  :key="key"
                  class="group/element relative"
                >
                  <div
                    class="hover:border border-white border-dashed p-2 flex flex-col justify-center items-center relative group transition-all duration-300 ease-in-out"
                  >
                    <component
                      :is="getComponent(element.component)"
                      :element="element"
                      :componentId="componentId"
                      :section="'right'"
                    />
                    <div class="group-hover:h-10 transition-all duration-300 ease-in-out"></div>
                    <ElementAdder
                      @open="() => openAddElementModal('right', key + 1)"
                    />
                    <button
                      class="absolute top-0 right-0 text-red-500 opacity-0 group-hover/element:opacity-100 transition-opacity duration-300 ease-in-out"
                      @click="
                        elementStore.removeElementFromComponent(
                          'right',
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
            <div v-else class="relative w-full  h-10"><ElementAdder  @open="() => openAddElementModal('right', 0)" /></div>
          </div>
        </div>
      </div>
      <!-- Add Icon -->
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
import NavigationOption from "@/components/molecules/NavigationOption.vue";
import ElementModal from "@/components/organisms/ElementModal.vue";
import ElementAdder from "../molecules/ElementAdder.vue";
import { VueDraggableNext } from "vue-draggable-next";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
  sections: { type: Object, required: true },
  componentId: { type: String, required: true },
});
const selectedSection = ref("");
const selectedPosition = ref(null);

console.log("props", props);

const emit = defineEmits(["input"]);
const store = useMainStore();
const elementStore = useElementStore();

const showAddElementModal = ref(false);

const updateContent = (key, event) => {
  const value = event.target.innerText;
  emit("input", { key, value });
  store.updateComponentProp(props.componentId, `content.${key}`, value);
};

const openAddElementModal = (section, index) => {
  console.log("index in openAddModal", index);
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
