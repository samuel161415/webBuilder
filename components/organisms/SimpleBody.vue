<template>
  <div
    :style="{
      padding: styles.padding.value,
      margin: styles.margin.value,
    }"
  >
    <h1
      :style="{ color: styles.textColor.value }"
      class="text-4xl font-bold mb-4"
      contenteditable="true"
      @input="updateContent('title', $event)"
    >
      {{ content.title }}
    </h1>
    <h2
      :style="{ color: styles.textColor.value }"
      class="text-2xl font-semibold mb-2"
      contenteditable="true"
      @input="updateContent('subtitle', $event)"
    >
      {{ content.subtitle }}
    </h2>
    <div class="flex">
      <p
        :style="{ color: styles.textColor.value }"
        class="text-lg mb-4"
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
          contenteditable="true"
          @input="updateContent('buttonText', $event)"
        >
          {{ content.buttonText }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useMainStore } from "@/stores/main";

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
