<template>
  <div>
    <h1>Content</h1>
    <div v-for="(value, key) in selectedComponentProps.content" :key="key">
      <label :for="key">{{ key }}</label>
      <input
        :id="key"
        v-model="selectedComponentProps.content[key]"
        @input="
          updateComponentProp(
            'content',
            key,
            selectedComponentProps.content[key]
          )
        "
      />
    </div>
    <h1>Styles</h1>
    <div v-for="(value, key) in selectedComponentProps.styles" :key="key">
      <label :for="key">{{ key }}</label>
      <input
        v-if="value.type === 'color'"
        type="color"
        :id="key"
        v-model="selectedComponentProps.styles[key].value"
        @input="
          updateComponentProp(
            'styles',
            key,
            selectedComponentProps.styles[key].value
          )
        "
      />
      <input
        v-else
        :id="key"
        v-model="selectedComponentProps.styles[key].value"
        @input="
          updateComponentProp(
            'styles',
            key,
            selectedComponentProps.styles[key].value
          )
        "
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "@/stores/main";

const store = useMainStore();
const selectedComponent = computed(() => store.selectedComponent);
const selectedId = computed(() => store.selectedComponentId);
const selectedComponentProps = computed(
  () => store.editableComponentProps[selectedId.value]
);

const updateComponentProp = (section, key, value) => {
  store.updateComponentProp(
    store.selectedComponentId,
    `${section}.${key}`,
    value
  );
};

watch(selectedId, (newId) => {
  console.log("selectedComponentId changed:", newId);
  console.log("selected component is", selectedComponent);
});
</script>
