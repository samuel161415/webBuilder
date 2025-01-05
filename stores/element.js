import { elementProps } from "~/utls/elementProps";
import { useMainStore } from "@/stores/main";

export const useElementStore = defineStore("element", {
  state: () => ({
    selectedElement: null,
    registeredElements: [
      { id: "button", name: "Button", component: "Button" },
      { id: "text", name: "Text", component: "Text" },
      { id: "input", name: "Input", component: "Input" },
      { id: "headline", name: "Headline", component: "Headline" },
      { id: "image", name: "Image", component: "Image" },
    ],
  }),
  actions: {
    setSelectedElement(element) {
      this.selectedElement = element;
    },
    addElementToComponent(section, index) {
      console.log("section",section, "index",index)
      const mainStore = useMainStore();
      const pageId = mainStore.selectedPageId;
      const componentId = mainStore.selectedComponentId;
      const element = this.selectedElement;
      console.log("addElementToComponent", element, section, index);

      if (!pageId || !componentId || !element) return;

      const page = mainStore.pages.find((p) => p.id === pageId);
      if (page) {
        const component = page.content.find((c) => c.id === componentId);
        console.log("component with selected value", component);
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
            sections: props.sections
              ? JSON.parse(JSON.stringify(props.sections))
              : {}, // Deep copy
          };

          // Generate a unique id for the added element
          const uniqueId = `${element.id}_${componentId}_${Date.now()}`;

          // Add the element to the appropriate section at the specified index
          if (!defaultProps.sections[section]) {
            defaultProps.sections[section] = [];
          }
          defaultProps.sections[section].splice(index, 0, {
            id: uniqueId,
            component: element.component,
            styles: JSON.parse(JSON.stringify(elementProps[element.id].styles)), // Deep copy
            content: JSON.parse(
              JSON.stringify(elementProps[element.id].content)
            ), // Deep copy
          });

          // Update the component's props
          component.props.sections = defaultProps.sections;

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
    removeElementFromComponent(section, elementId) {
      console.log("removeElementFromComponent", section, elementId);
      const mainStore = useMainStore();
      const pageId = mainStore.selectedPageId;
      const componentId = mainStore.selectedComponentId;
      if (!pageId || !componentId) return;

      const page = mainStore.pages.find((p) => p.id === pageId);
      if (page) {
        const component = page.content.find((c) => c.id === componentId);
        if (component && component.props.sections[section]) {
          const elementIndex = component.props.sections[section].findIndex(
            (e) => e.id === elementId
          );
          if (elementIndex !== -1) {
            component.props.sections[section].splice(elementIndex, 1);
          }
        }
      }
    },
    updateElementProp(componentId, elementId, key, value, section) {
      console.log("updateElementProp", componentId, elementId, key, value);
      const mainStore = useMainStore();
      const page = mainStore.pages.find(
        (p) => p.id === mainStore.selectedPageId
      );
      if (page) {
        const component = page.content.find((c) => c.id === componentId);
        if (component) {
          const elementSection = component.props.sections[section];
          if (elementSection) {
            const element = elementSection.find((e) => e.id === elementId);
            if (element) {
              const [propSection, propKey] = key.split(".");
              if (propSection === "content") {
                element.content[propKey] = value;
              } else if (propSection === "styles") {
                element.styles[propKey].value = value;
              }
            }
          }
        }
      }
    },
  },
});
