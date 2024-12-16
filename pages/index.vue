<template>
  <div>
    <div class="flex">
      <Sidebar />
      <Editor />
    </div>
  </div>
</template>

<script>
import Editor from "@/components/organisms/Editor.vue";
import Sidebar from "~/components/organisms/Sidebar.vue";

export default {
  components: {
    Editor,
    Sidebar
  },
};
</script>
