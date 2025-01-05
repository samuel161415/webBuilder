<template>
  <div
    :style="{
      backgroundImage: `url(${content.imgSrc})`,
    }"
    :class="isSelected ? 'border-2 border-dashed' : ''"
    class="bg-cover bg-center"
  >
    <div class="bg-[rgba(0,0,0,0.7)] pb-8">
      <NavigationOption
        :navigationClass="styles.navigationDisplay.value"
        :navigationJustify="styles.navigationJustify.value"
        :navigationColor="styles.navigationColor.value"
        :navigationBackgroundColor="styles.navigationBackgroundColor.value"
        :items="content.items"
      />
      <div
        :style="{
          display: styles.display.value,
          flexDirection: styles.flexDirection.value,
          alignItems: styles.alignItems.value,
          justifyContent: styles.justifyContent.value,
        }"
        class="mt-8 px-8 relative group"
      >
        <div
          class="text-center flex flex-col justify-center items-center px-5 pb-8"
        >
          <!-- <h1
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
          </button> -->

          <!-- Render selected elements -->
          <VueDraggableNext
            v-if="sections?.center.length > 0"
            :list="sections?.center"
            group="elements"
            class="w-full"
          >
            <transition-group>
              <div
                v-for="(element, key) in sections?.center"
                :key="key"
                class="group/element relative w-full"
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
