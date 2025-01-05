<template>
  <div class="text-gray-500 h-full border border-red-500">
    <!-- Content Section -->
    <div class="mb-8">
      <h1
        class="text-xl text-center border-b px-2 pb-1 border-green-500 text-green-500 font-semibold mb-4 flex justify-between items-center cursor-pointer"
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
        <h1 class="text-lg px-2 text-green-500 font-semibold my-2">
          Nested Content
        </h1>
        <div
          v-for="(section, sectionName) in selectedComponentProps.sections"
          :key="sectionName"
          class="p-2 bg-gray-200"
        >
          <h2 class="text-lg font-semibold mb-2 text-green-500">
            {{ sectionName }}
          </h2>
          <div v-for="(element, index) in section" :key="index">
            <div class="border border-dashed border-gray-500 p-2 my-2">
              <h3 class="text-md font-semibold">{{ element.id }}</h3>
              <div v-for="(value, key) in element.content" :key="key">
                <div class="flex flex-col">
                  <!-- <label :for="key">{{ key }}</label> -->
                  <input
                    :id="key"
                    v-model="element.content[key]"
                    class="px-4 py-2 mb-2 text-gray-600 rounded focus:outline-none border-none"
                    @input="
                      updateElementProp(
                        selectedId,
                        element.id,
                        `content.${key}`,
                        element.content[key],
                        sectionName
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Styles Section -->
    <div class="">
      <h1
        class="text-xl text-center px-2 border-b pb-1 border-green-500 text-green-500 font-semibold my-4 flex justify-between items-center cursor-pointer"
        @click="toggleStyles"
      >
        Styles
        <i
          :class="stylesExpanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
        ></i>
      </h1>
      <div v-if="stylesExpanded">
        <!-- Color Styles -->
        <div class="mb-4 bg-gray-200 p-2">
          <h2
            class="text-xl font-semibold text-green-500 mb-2 p-2 border-b border-green-500"
          >
            Colors
          </h2>
          <div v-for="(value, key) in filteredStyles.color" :key="key">
            <div
              class="my-1 p-2 flex items-center border border-dashed border-gray-500 justify-start"
            >
              <label class="mr-2" :for="key">{{ key }}:</label>
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
        <div class="mb-4 bg-gray-200 p-2">
          <h2
            class="text-xl font-semibold text-green-500 mb-2 p-2 border-b border-green-500"
          >
            Dimensions
          </h2>
          <div v-for="(value, key) in filteredStyles.dimension" :key="key">
            <div class="my-1 p-2 border border-dashed border-gray-500">
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
        <div class="mb-4 bg-gray-200 p-2">
          <h2
            class="text-xl font-semibold text-green-500 mb-2 p-2 border-b border-green-500"
          >
            Spacing
          </h2>
          <div v-for="(value, key) in filteredStyles.space" :key="key">
            <div class="my-1 p-2 border border-dashed border-gray-500">
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

        <!-- Dispay Styles -->
        <div class="mb-4 bg-gray-200 p-2">
          <h2
            class="text-xl font-semibold text-green-500 mb-2 p-2 border-b border-green-500"
          >
            Display
          </h2>
          <div v-for="(value, key) in filteredStyles.display" :key="key">
            <div class="my-1 p-2 border border-dashed border-gray-500">
              <label :for="key">{{ key }}</label>
              <DisplayController
                :propKey="key"
                :value="value.value"
                class="focus:outline-none border-none"
                @update="updateDisplayComponentProp('styles', $event)"
              />
            </div>
          </div>
        </div>
        <!-- Image Styles -->
        <div class="mb-4 bg-gray-200 p-2">
          <h2
            class="text-xl font-semibold text-green-500 mb-2 p-2 border-b border-gray-500"
          >
            Image Styles
          </h2>
          <div v-for="(value, key) in filteredStyles.image" :key="key">
            <div class="my-1 p-2 border border-dashed border-gray-500">
              <label :for="key">{{ key }}</label>
              <component
                :is="getComponentForStyle(value.type)"
                :value="value.value"
                :propKey="key"
                class="focus:outline-none border-none"
                @update="updateComponentProp('styles', key, $event)"
              />
            </div>
          </div>
        </div>

        <h1 class="text-lg text-green-500 my-2 px-2">Nested Styles</h1>
        <div
          v-for="(section, sectionName) in selectedComponentProps.sections"
          :key="sectionName"
          class="p-2 bg-gray-200"
        >
          <h2 class="text-lg font-semibold mb-2 text-green-500">
            {{ sectionName }}
          </h2>
          <div v-for="(element, index) in section" :key="index">
            <h3 class="text-md font-semibold mb-2">{{ element.id }}</h3>
            <div v-for="(value, key) in element.styles" :key="key">
              <div
                class="my-2 flex items-center justify-start border p-1 border-dashed border-gray-500"
              >
                <label class="mr-2 border-b" :for="key">{{ key }}:</label>
                <component
                  :is="getComponentForStyle(value.type)"
                  :value="value.value"
                  :propKey="key"
                  class="focus:outline-none border-none"
                  @update="
                    updateElementProp(
                      selectedId,
                      element.id,
                      `styles.${key}`,
                      $event,
                      sectionName
                    )
                  "
                />
              </div>
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
import ColorPicker from "@/components/molecules/styles/ColorPicker.vue";
import SpaceController from "@/components/molecules/styles/SpaceController.vue";
import DimensionController from "@/components/molecules/styles/DimensionController.vue";
import DisplayController from "@/components/molecules/styles/DisplayController.vue";
// import FontStyleController from "@/components/molecules/styles/FontStyleController.vue";
import FontWeightController from "../molecules/styles/FontWeightController.vue";
import TextAlignController from "../molecules/styles/TextAlignController.vue";
import PositionType from "../molecules/styles/PositionType.vue";
import PositionCoordinateController from "../molecules/styles/PositionCoordinateController.vue";
import ZIndexController from "../molecules/styles/ZIndexController.vue";
import ImageStyleController from "../molecules/styles/ImageStyleController.vue";
import BackgroundPositionController from "../molecules/styles/BackgroundPositionController.vue";
import BackgroundSizeController from "../molecules/styles/BackgroundSizeController.vue";
import ObjectFitController from "../molecules/styles/ObjectFitController.vue";

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
  store.updateComponentProp(
    store.selectedComponentId,
    `${section}.${key}`,
    value
  );
};
const updateElementProp = (componentId, elementId, key, value, sectionName) => {
  elementStore.updateElementProp(
    componentId,
    elementId,
    key,
    value,
    sectionName
  );
};

const updateDisplayComponentProp = (section, { key, value }) => {
  console.log("updated display", key, value);
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
    // case "font":
    //   return FontStyleController;
    // case "font-style":
    //   return FontStyleController;
    case "font-weight":
      return FontWeightController;
    case "text-align":
      return TextAlignController;
    case "position":
      return PositionType;
    case "position-coordinate":
      return PositionCoordinateController;
    case "z-index":
      return ZIndexController;
    case "object-fit":
      return ObjectFitController;
    case "background-position":
      return BackgroundPositionController;
    case "background-size":
      return BackgroundSizeController;
    default:
      return "input";
  }
};

const filteredStyles = computed(() => {
  const styles = selectedComponentProps.value.styles || {};
  console.log("the selected style is ", styles);
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
    image: Object.fromEntries(
      Object.entries(styles).filter(
        ([_, v]) =>
          v.type === "object-fit" ||
          v.type === "background-size" ||
          v.type === "background-position"
      )
    ),
  };
});
console.log("filteredStyles", filteredStyles.value.image);
</script>
