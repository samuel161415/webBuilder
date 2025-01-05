<template>
  <div>
    <template v-if="checkIfKeyHas(propKey, 'position')">
      <select
        :value="value"
        @change="handleStyleChange($event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="center">Center</option>
        <option value="top">Top</option>
        <option value="left">Left</option>
      </select>
    </template>
    <template v-else-if="checkIfKeyHas(propKey, 'size')">
      <select
        :value="value"
        @change="handleStyleChange($event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="auto">Auto</option>
      </select>
    </template>
    <template v-else-if="checkIfKeyHas(propKey, 'fit')">
      <select
        :value="value"
        @change="handleStyleChange($event.target.value)"
        class="w-full px-2 py-1 border border-gray-300 rounded"
      >
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="fill">Fill</option>
      </select>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  propKey: {type:String, required: true},
  value: { type: String, required: true },
  secondType: { type: String, required: true },
});
console.log("props in image style controller",props)
const emit = defineEmits(["update"]);

const checkIfKeyHas = (key, value) => {
  const tempString = key.toLowerCase();
  return tempString.includes(value);
};

const handleStyleChange = (newValue) => {
  emit("update", newValue);
};
</script>
