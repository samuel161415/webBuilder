export const elementProps = {
  button: {
    styles: {
      textColor: { type: "color", value: "#ffffff" },
      buttonBgColor: { type: "color", value: "#10b981" },
      buttonTextColor: { type: "color", value: "#ffffff" },
      // padding: { type: "space", value: "24px" },
      margin: { type: "space", value: "16px" },
      paddingHorizontal: { type: "space", value: "16px" },
      paddingVertical: { type: "space", value: "5px" },
      borderRadius: { type: "space", value: "5px" },
    },
    content: {
      text: "Click Me",
    },
  },
  input: {
    styles: {
      padding: { type: "space", value: "24px" },
      margin: { type: "space", value: "16px" },
      paddingHorizontal: { type: "space", value: "16px" },
      paddingVertical: { type: "space", value: "5px" },
      borderRadius: { type: "space", value: "5px" },
      border: { type: "dimension", value:"1.5px"},
      borderColor: {type: "color", value: "#10b981"}
    },
    content: {
      placeholder: "type anything",

    },   
  },
  text:{
    content : {
        title : "lorem sorem borem dorem"
    },
    styles: {
        textColor :{ type: "color", value: "#000000" },
        fontSize : { type: "dimension", value: "16px" },
    }
  },
  
};
