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
            added_elements: props.added_elements || [], // Ensure added_elements is defined
          };

          // Add the element to the added_elements array
          defaultProps.added_elements.push({
            id: element.id,
            component: element.component,
            styles: elementProps[element.id].styles,
            content: elementProps[element.id].content,
          });

          const elementIndex = defaultProps.added_elements.length - 1;
          const tempContentKey = `temp_${element.id}_${elementIndex}`;

        
          // Update the component's props
          component.props.added_elements = defaultProps.added_elements;

          // Update the editableComponentProps
          if (!mainStore.editableComponentProps[componentId]) {
            mainStore.editableComponentProps[componentId] = {
              content: {},
              styles: {},
            };
          }
          // mainStore.editableComponentProps[componentId].content[
          //   tempContentKey
          // ] = tempContent;
          // mainStore.editableComponentProps[componentId].styles[element.id] =
          //   defaultProps.styles[element.id] || {};
        }
      }
    },
    updateElementProp(componentId, elementId, key, value) {
      console.log("I am in updateElementProp")
      console.log("componentId",componentId, " elementId",elementId, " key",key, " value",value)
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
