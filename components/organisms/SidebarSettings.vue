<template>
  <div class="text-gray-500 h-full">
    <!-- Content Section -->
    <div class="mb-8">
      <h1
        class="text-xl text-center border-b pb-1 border-green-500 text-green-500 font-semibold mb-4 flex justify-between items-center cursor-pointer"
        @click="toggleContent"
      >
        Content
        <i
          :class="
            contentExpanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'
          "
        ></i>
      </h1>
      <div v-if="contentExpanded">
        <div v-for="(value, key) in selectedComponentProps.content" :key="key">
          <div class="my-1 p-2 flex flex-col">
            <label :for="key">{{ key }}</label>
            <input
              :id="key"
              v-model="selectedComponentProps.content[key]"
              class="px-4 py-3 rounded-none focus:outline-none border-none"
              @input="
                updateComponentProp(
                  'content',
                  key,
                  selectedComponentProps.content[key]
                )
              "
            />
          </div>
        </div>
        <h1 class="text-lg text-green-500 my-2">Nested Content</h1>
        <div
          v-for="(element, index) in selectedComponentProps.added_elements"
          :key="index"
        >
          <h2 class="text-lg font-semibold mb-2">{{ element.id }}</h2>
          <div v-for="(value, key) in element.content" :key="key">
            <div class="my-1 p-2 flex flex-col">
              <label :for="key">{{ key }}</label>
              <input
                :id="key"
                v-model="element.content[key]"
                class="px-4 py-3 rounded-none focus:outline-none border-none"
                @input="
                  updateElementProp(
                    selectedId,
                    element.id,
                    `content.${key}`,
                    element.content[key]
                  )
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Styles Section -->
    <div class="">
      <h1
        class="text-xl text-center border-b pb-1 border-green-500 text-green-500 font-semibold my-4 flex justify-between items-center cursor-pointer"
        @click="toggleStyles"
      >
        Styles
        <i
          :class="stylesExpanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
        ></i>
      </h1>
      <div v-if="stylesExpanded">
        <!-- Color Styles -->
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2 pb-2 border-b border-gray-500">
            Colors
          </h2>
          <div v-for="(value, key) in filteredStyles.color" :key="key">
            <div class="my-1 p-2 flex items-center border justify-start">
              <label class="mr-2 pb-2 border-b" :for="key">{{ key }}:</label>
              <component
                :is="getComponentForStyle(value.type)"
                :value="value.value"
                class="focus:outline-none border-none"
                @update="updateComponentProp('styles', key, $event)"
              />
            </div>
          </div>
        </div>

        <!-- Dimension Styles -->
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2 pb-2 border-b border-gray-500">
            Dimensions
          </h2>
          <div v-for="(value, key) in filteredStyles.dimension" :key="key">
            <div class="my-1 p-2">
              <label :for="key">{{ key }}:</label>
              <component
                :is="getComponentForStyle(value.type)"
                :value="value.value"
                class="focus:outline-none border-none"
                @update="updateComponentProp('styles', key, $event)"
              />
            </div>
          </div>
        </div>

        <!-- Space Styles -->
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2 pb-2 border-b border-gray-500">
            Spacing
          </h2>
          <div v-for="(value, key) in filteredStyles.space" :key="key">
            <div class="my-1 p-2">
              <label :for="key">{{ key }}</label>
              <component
                :is="getComponentForStyle(value.type)"
                :value="value.value"
                class="focus:outline-none border-none"
                @update="updateComponentProp('styles', key, $event)"
              />
            </div>
          </div>
        </div>

        <!-- Display Styles -->
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2 pb-2 border-b border-gray-500">
            Display
          </h2>
          <div v-for="(value, key) in filteredStyles.display" :key="key">
            <div class="my-1 p-2">
              <label :for="key">{{ key }}</label>
              <component
                :is="getComponentForStyle(value.type)"
                :value="value.value"
                class="focus:outline-none border-none"
                @update="updateDisplayComponentProp('styles', $event)"
              />
            </div>
          </div>
        </div>

        <h1 class="text-lg text-green-500 my-2">Nested Styles</h1>
        <div
          v-for="(element, index) in selectedComponentProps.added_elements"
          :key="index"
        >
          <h2 class="text-lg font-semibold mb-2">{{ element.id }}</h2>
          <div v-for="(value, key) in element.styles" :key="key">
            <div class="my-1 p-2 flex items-center border justify-start">
              <label class="mr-2 pb-2 border-b" :for="key">{{ key }}:</label>
              <component
                :is="getComponentForStyle(value.type)"
                :value="value.value"
                class="focus:outline-none border-none"
                @update="
                  updateElementProp(
                    selectedId,
                    element.id,
                    `styles.${key}`,
                    $event
                  )
                "
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
import ColorPicker from "@/components/molucules/styles/ColorPicker.vue";
import SpaceController from "@/components/molucules/styles/SpaceController.vue";
import DimensionController from "@/components/molucules/styles/DimensionController.vue";
import DisplayController from "@/components/molucules/styles/DisplayController.vue";
import FontStyleController from "@/components/molucules/styles/FontStyleController.vue";

const store = useMainStore();
const elementStore = useElementStore();
const selectedComponent = computed(() => store.selectedComponent);
const selectedId = computed(() => store.selectedComponentId);
const selectedComponentProps = computed(
  () => store.editableComponentProps[selectedId.value]
);

const contentExpanded = ref(true);
const stylesExpanded = ref(true);

const toggleContent = () => {
  contentExpanded.value = !contentExpanded.value;
};

const toggleStyles = () => {
  stylesExpanded.value = !stylesExpanded.value;
};

const updateComponentProp = (section, key, value) => {
  console.log("section", section, " key", key, " value", value);
  store.updateComponentProp(
    store.selectedComponentId,
    `${section}.${key}`,
    value
  );
};
const updateElementProp = (componentId, elementId, key, value) => {
  elementStore.updateElementProp(componentId, elementId, key, value);
};

const updateDisplayComponentProp = (section, { key, value }) => {
  console.log("section", section, " key", key, " value", value);
  store.updateComponentProp(
    store.selectedComponentId,
    `${section}.${key}`,
    value
  );
};

const getComponentForStyle = (type) => {
  switch (type) {
    case "color":
      return ColorPicker;
    case "space":
      return SpaceController;
    case "dimension":
      return DimensionController;
    case "display":
      return DisplayController;
    case "font":
      return FontStyleController;
    default:
      return "input";
  }
};

const filteredStyles = computed(() => {
  const styles = selectedComponentProps.value.styles || {};
  return {
    color: Object.fromEntries(
      Object.entries(styles).filter(([_, v]) => v.type === "color")
    ),
    dimension: Object.fromEntries(
      Object.entries(styles).filter(([_, v]) => v.type === "dimension")
    ),
    space: Object.fromEntries(
      Object.entries(styles).filter(([_, v]) => v.type === "space")
    ),
    display: Object.fromEntries(
      Object.entries(styles).filter(([_, v]) => v.type === "display")
    ),
  };
});


</script>
