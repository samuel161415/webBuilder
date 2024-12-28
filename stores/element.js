import { elementProps } from "~/utls/elementProps";
import { useMainStore } from "@/stores/main";

export const useElementStore = defineStore("element", {
  state: () => ({
    selectedElement: null,
    registeredElements: [
      { id: "button", name: "Button", component: "Button" },
      { id: "text", name: "Text", component: "Text" },
      { id: "input", name: "Input", component: "Input" },
    ],
  }),
  actions: {
    setSelectedElement(element) {
      this.selectedElement = element;
    },
    addElementToComponent() {
      const mainStore = useMainStore();
      const pageId = mainStore.selectedPageId;
      const componentId = mainStore.selectedComponentId;
      const element = this.selectedElement;

      if (!pageId || !componentId || !element) return;

      const page = mainStore.pages.find((p) => p.id === pageId);
      if (page) {
        const component = page.content.find((c) => c.id === componentId);
        if (component) {
          const props = component.props || {};
          const defaultProps = {
            styles: Object.keys(props.styles || {}).reduce((acc, key) => {
              acc[key] = {
                value: props.styles[key].value,
                type: props.styles[key].type,
              };
              return acc;
            }, {}),
            content: { ...props.content },
            added_elements: props.added_elements
              ? JSON.parse(JSON.stringify(props.added_elements))
              : [], // Deep copy
          };

          // Generate a unique id for the added element
          const uniqueId = `${element.id}_${componentId}_${Date.now()}`;

          // Add the element to the added_elements array
          defaultProps.added_elements.push({
            id: uniqueId,
            component: element.component,
            styles: JSON.parse(JSON.stringify(elementProps[element.id].styles)), // Deep copy
            content: JSON.parse(
              JSON.stringify(elementProps[element.id].content)
            ), // Deep copy
          });

          // Update the component's props
          component.props.added_elements = defaultProps.added_elements;

          // Update the editableComponentProps
          if (!mainStore.editableComponentProps[componentId]) {
            mainStore.editableComponentProps[componentId] = {
              content: {},
              styles: {},
            };
          }
        }
      }
    },
    updateElementProp(componentId, elementId, key, value) {
      const mainStore = useMainStore();
      const page = mainStore.pages.find(
        (p) => p.id === mainStore.selectedPageId
      );
      if (page) {
        const component = page.content.find((c) => c.id === componentId);
        if (component) {
          const element = component.props.added_elements.find(
            (e) => e.id === elementId
          );
          if (element) {
            const [section, propKey] = key.split(".");
            if (section === "content") {
              element.content[propKey] = value;
            } else if (section === "styles") {
              element.styles[propKey].value = value;
            }
          }
        }
      }
    },
  },
});
