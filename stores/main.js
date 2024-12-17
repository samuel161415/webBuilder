import { defineStore } from "pinia";
import { placeholderIds } from "~/utls/placeholders";
import { componentProps } from "~/utls/componentProps";

export const useMainStore = defineStore("main", {
  state: () => ({
    sidebarMode: "pages", // 'pages' or 'settings'
    pages: [], // Pages with content or placeholders
    selectedPageId: null, // Selected page ID
    selectedComponentId: null, // Selected component in the editor
    showModal: false, // Modal visibility state
    registeredComponents: {
      Navigation: [
        { id: "hero1", name: "Hero with Background Color", component: "Hero1" },
        { id: "hero2", name: "Hero with Background Image", component: "Hero2" },
        { id: "hero3", name: "Hero with Image and Text", component: "Hero3" },
      ],
      bodyComponent: [
        { id: "simpleBody", name: "Simple Body", component: "SimpleBody" },
      ],
    },
    editableComponentProps: {},
  }),
  actions: {
    setSidebarMode(mode) {
      this.sidebarMode = mode;
    },
    addPage(page) {
      const id = Date.now();
      this.pages.push({
        id,
        ...page,
        content: [
          { id: "placeholder1", name: "NavigationPlaceholder", props: {} },
          { id: "placeholder2", name: "ComponentPlaceholder", props: {} },
          { id: "placeholder3", name: "FooterPlaceholder", props: {} },
        ],
      });
      this.selectedPageId = id;
    },
    updatePage(updatedPage) {
      const index = this.pages.findIndex((p) => p.id === updatedPage.id);
      if (index !== -1) {
        this.pages[index] = updatedPage;
      }
    },
    updatePageContent(pageId, content) {
      const page = this.pages.find((p) => p.id === pageId);
      if (page) page.content = content;
    },
    setSelectedPage(pageId) {
      this.selectedPageId = pageId;
      this.sidebarMode = "pages";
    },
    setSelectedComponent(componentId) {
      // console.log("componentId issss", componentId);

      this.selectedComponentId = componentId;
      this.sidebarMode = "settings";

      if (!placeholderIds.includes(componentId)) {
        const component = this.pages
          .find((p) => p.id === this.selectedPageId)
          ?.content.find((c) => c.id === componentId);
        if (component) {
          // console.log("component props",component)
          this.editableComponentProps[componentId] = component.props;
        }
      }
      // console.log("editableComponentProps", this.editableComponentProps);
    },
    setModalVisibility(visible) {
      this.showModal = visible;
    },
    replacePlaceholder(pageId, placeholderId, component) {
      const page = this.pages.find((p) => p.id === pageId);
      if (page) {
        const index = page.content.findIndex((c) => c.id === placeholderId);
        if (index !== -1) {
          const props = componentProps[component.id] || {};
          const defaultProps = {
            styles: Object.keys(props.styles).reduce((acc, key) => {
              acc[key] = props.styles[key].value;
              return acc;
            }, {}),
            content: { ...props.content },
          };
          page.content.splice(index, 1, {
            id: component.id,
            name: component.component,
            props: defaultProps,
          });
        }
        this.setSelectedComponent(component.id);
      }
    },
    updateComponentProp(componentId, key, value) {
      // console.log("componentId", componentId, " key", key, " value", value);
      if (!this.editableComponentProps[componentId]) {
        this.editableComponentProps[componentId] = {};
      }
      this.editableComponentProps[componentId][key] = value;

      // Update the component's props in the page content
      const page = this.pages.find((p) => p.id === this.selectedPageId);
      if (page) {
        const component = page.content.find((c) => c.id === componentId);
        if (component) {
          component.props[key] = value;
        }
      }
    },
  },
  getters: {
    currentPageContent(state) {
      return (
        state.pages.find((p) => p.id === state.selectedPageId)?.content || []
      );
    },
    selectedComponent(state) {
      const page = state.pages.find((p) => p.id === state.selectedPageId);
      if (page) {
        return (
          page.content.find((c) => c.id === state.selectedComponentId) || null
        );
      }
      return null;
    },
    getComponentProps: (state) => (componentId) => {
      return state.editableComponentProps[componentId] || {};
    },
  },
});
