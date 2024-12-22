<template>
  <div :style="{ backgroundColor: styles.backgroundColor.value }" class="p-8">
    <NavigationOption
      :navigationClass="styles.navigationDisplay.value"
      :navigationJustify="styles.navigationJustify.value"
      :navigationColor="styles.navigationColor.value"
      :items="content.items"
    />
    <div :style="{ display: styles.display.value }" class="mt-8">
      <div
        class="w-1/2 text-center flex flex-col justify-center items-center px-5"
      >
        <h1
          class="text-4xl font-bold"
          :style="{ color: styles.textColor.value }"
          contenteditable="true"
          @input="updateContent('title', $event)"
        >
          {{ content.title }}
        </h1>
        <p
          class="my-4 text-lg"
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
            contenteditable="true"
            @input="updateContent('buttonText', $event)"
          >
            {{ content.buttonText }}
          </div>
        </button>
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
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useMainStore } from "@/stores/main";
import NavigationOption from "@/components/molucules/NavigationOption.vue";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
});

const emit = defineEmits(["input"]);
const store = useMainStore();

const updateContent = (key, event) => {
  const value = event.target.innerText;
  emit("input", { key, value });
  store.updateComponentProp(store.selectedComponentId, `content.${key}`, value);
};
</script>
