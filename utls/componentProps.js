export const componentProps = {
  simpleBody: {
    styles: {
      textColor: { type: "color", value: "#2563eb" },
      buttonBgColor: { type: "color", value: "#eab308" },
      buttonTextColor: { type: "color", value: "#ffffff" },
      padding: { type: "space", value: "24px" },
      margin: { type: "space", value: "16px" },
      paddingHorizontal: { type: "space", value: "16px" },
      paddingVertical: { type: "space", value: "5px" },
      borderRadius: { type: "space", value: "5px" },
      display: { type: "display", value: "block" },
    },
    content: {
      title: "Simple Body Title",
      subtitle: "Simple Body Subtitle",
      description: "This is a simple body description.",
      buttonText: "Click Me",
    },
  },
  hero3: {
    styles: {
      backgroundColor: { type: "color", value: "#ffffff" },
      textColor: { type: "color", value: "#1f2937" },
      display: { type: "display", value: "flex" },
      imageHeight: { type: "dimension", value: "300px" },
      imageWidth: { type: "dimension", value: "100%" },
      imageBorderRadius: { type: "space", value: "10px" },
      buttonBgColor: { type: "color", value: "#22c55e" },
      buttonTextColor: { type: "color", value: "#ffffff" },
      buttonPadding: {type: "space", value: "8px 16px"},
      navigationDisplay: { type: "display", value: "flex" },
      navigationJustify: { type: "display", value: "space-between" },
      navigationColor: { type: "color", value: "#1f2937" },
    },
    content: {
      title: "Invest intelligently with our Innovative Solutions",
      description: "This is a hero description.",
      imageSrc: "/images/imbg.jpg",
      imageAlt: "Image description",
      buttonText: "Click Me",
      items: ["Home", "About", "Contact"],
    },
  },
  // Add other components' default props here
};
