<template>
  <div :class="[styles.padding, styles.margin]">
    <h1
      :class="[
        styles.textColor || 'text-black',
        'text-4xl',
        'font-bold',
        'mb-4'
      ]"
      contenteditable="true"
      @input="updateContent('title', $event)"
    >
      {{ content.title }}
    </h1>
    <h2
      :class="[styles.textColor]"
      contenteditable="true"
      @input="updateContent('subtitle', $event)"
    >
      {{ content.subtitle }}
    </h2>
    <div class="flex">
      <p
        :class="[styles.textColor]"
        contenteditable="true"
        @input="updateContent('description', $event)"
      >
        {{ content.description }}
      </p>
      <Button
        :bgColor="styles.buttonBgColor || 'bg-blue-500'"
        :textColor="styles.buttonTextColor || 'text-blue-500'"
      >
        <div
          contenteditable="true"
          @input="updateContent('buttonText', $event)"
        >
          {{ content.buttonText }}
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import Button from "@/components/atoms/Button.vue";

const props = defineProps({
  content: { type: Object, required: true },
  styles: { type: Object, required: true },
});
console.log("props.styles", props.styles);

const emit = defineEmits(["input"]);

const updateContent = (key, event) => {
  const value = event.target.innerText;
  emit("input", { key, value });
};
</script>
