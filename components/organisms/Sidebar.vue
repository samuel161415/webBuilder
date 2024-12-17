<template>
  <div
    class="md:w-1/4 lg:w-1/5 border border-red-500 h-screen bg-gray-100 py-4"
  >
    <!-- Logo -->
    <Logo />
    <!-- Sidebar Menu -->
    <SidebarMenu :menuItems="menuItems" />

    <!-- Conditional Content -->
    <div v-if="activeTab === 'pages'" class="mt-5 px-4">
      <ul>
        <li
          v-for="(page, index) in pages"
          :key="page.id"
          class="flex items-center justify-between mb-2"
        >
          <Button
            :textColor="'text-black'"
            :bgColor="'bg-white'"
            :padding="'px-2 py-1'"
            :borderRadius="'rounded'"
            @click="selectPage(page.id)"
          >
            {{ page.name }}
          </Button>
          <i
            class="pi pi-pencil text-blue-500 cursor-pointer ml-2"
            @click="openEditModal(page)"
          ></i>
        </li>
      </ul>
      <div class="w-full p-4 border-t mt-5">
        <Button
          :padding="'px-2 py-1'"
          :textColor="'text-blue-500'"
          @click="addNewPage"
        >
          Add Page
        </Button>
      </div>
    </div>

    <div v-else class="mt-3 p-2">
      <p v-if="!selectedComponentProps">
        Please select a component to edit in the editor section.
      </p>
      <SidebarSettings v-else />
    </div>

    <!-- Modal for Editing Page -->
    <EditPageModal
      :show="showModal"
      :page="editablePage"
      @close="closeModal"
      @save="savePageName"
      @delete="deletePage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "@/stores/main";
import Button from "@/components/atoms/Button.vue";
import Logo from "@/components/atoms/Logo.vue";
import SidebarMenu from "@/components/molucules/SidebarMenuOption.vue";
import EditPageModal from "@/components/molucules/EditPageModal.vue";
import SidebarSettings from "./SidebarSettings.vue";

const store = useMainStore();

// Define menu items
const menuItems = ref([{ label: "Pages" }, { label: "Settings" }]);

// Bind state from Pinia
const pages = computed(() => store.pages);
const activeTab = computed(() => store.sidebarMode);
const selectedComponent = computed(() => store.selectedComponent);
const selectedId = computed(() => store.selectedComponentId);
const selectedComponentProps= computed(() => store.editableComponentProps[selectedId.value]);

// console.log("selectedComponentProps", selectedComponentProps.value);

// Modal state
const showModal = ref(false);
const editablePage = ref({});

// Functions
const addNewPage = () => {
  store.addPage({ name: "New Page" });
};

const openEditModal = (page) => {
  editablePage.value = { ...page };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editablePage.value = {};
};

const savePageName = () => {
  store.updatePage(editablePage.value);
  closeModal();
};

const deletePage = (id) => {
  store.deletePage(id);
  closeModal();
};

const selectPage = (id) => {
  store.setSelectedPage(id);
};

const updateComponentProp = (key, value) => {
  store.updateComponentProp(store.selectedComponentId, key, value);
};
</script>
