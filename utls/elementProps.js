export const elementProps = {
  button: {
    styles: {
      textColor: { type: "color", value: "#ffffff" },
      buttonBgColor: { type: "color", value: "#10b981" },
      buttonTextColor: { type: "color", value: "#ffffff" },
      // padding: { type: "space", value: "24px" },
      marginY: { type: "space", value: "16px" },
      marginX: { type: "space", value: "0px" },
      paddingX: { type: "space", value: "16px" },
      paddingY: { type: "space", value: "5px" },
      borderRadius: { type: "space", value: "5px" },
    },
    content: {
      text: "Click Me",
    },
  },
  input: {
    styles: {
      padding: { type: "space", value: "24px" },
      paddingX: { type: "space", value: "16px" },
      paddingY: { type: "space", value: "8px" },
      borderRadius: { type: "space", value: "5px" },
      border: { type: "dimension", value: "1.5px" },
      borderColor: { type: "color", value: "#10b981" },
      marginY: { type: "space", value: "16px" },
      marginX: { type: "space", value: "0px" },
    },
    content: {
      placeholder: "type anything",
      value: "",
    },
  },
  text: {
    content: {
      title: "lorem sorem borem dorem",
    },
    styles: {
      textColor: { type: "color", value: "#000000" },
      fontSize: { type: "dimension", value: "16px" },
      textAlign: { type: "text-align", value: "left" },
      fontWeight: { type: "font-weight", value: "700" },
      fontStyle: { type: "font-style", value: "normal" },
      marginY: { type: "space", value: "16px" },
      marginX: { type: "space", value: "0px" },
    },
  },
  headline: {
    content: {
      title: "Headline text",
    },
    styles: {
      textColor: { type: "color", value: "#000000" },
      fontSize: { type: "space", value: "24px" },
      textAlign: { type: "text-align", value: "left" },
      fontWeight: { type: "font-weight", value: "700" },
      fontStyle: { type: "font-style", value: "normal" },
      marginY: { type: "space", value: "16px" },
      marginX: { type: "space", value: "0px" },
    },
  },
};
