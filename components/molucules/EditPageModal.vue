<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-1/3">
        <h3 class="text-xl font-bold mb-4">Edit Page</h3>
        <input
          v-model="page.name"
          type="text"
          class="w-full border px-4 py-2 rounded mb-4"
          placeholder="Page Name"
        />
        <div class="flex justify-between">
          <button
            class="bg-red-500 text-white px-4 py-2 rounded"
            @click="deletePage(page.id)"
          >
            Delete
          </button>
          <div>
            <button
              class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              @click="close"
            >
              Cancel
            </button>
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded"
              @click="save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      page: Object,
    },
    emits: ["close", "save", "delete"],
    methods: {
      close() {
        this.$emit("close");
      },
      save() {
        this.$emit("save", this.page);
      },
      deletePage(id) {
        this.$emit("delete", id);
      },
    },
  };
  </script>