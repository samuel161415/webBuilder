import PositionCoordinateController from "../components/molecules/styles/PositionCoordinateController.vue";

export const componentProps = {
  simpleBody: {
    styles: {
      // padding: { type: "space", value: "5px" },
      borderRadius: { type: "space", value: "5px" },
      mainBodyDisplay: { type: "display", value: "flex" },
      mainBodyJustify: { type: "display", value: "center" },
      mainBodyAlign: { type: "display", value: "center" },
      opacity: { type: "dimension", value: "0.5" },
    },
    content: {
      title: "Simple Body Title",
      subtitle: "Simple Body Subtitle",
      description: "This is a simple body description.",
      buttonText: "Click Me",
      bgImageSource: "/images/imbg.jpg",
    },
    sections: {
      center: [
        {
          id: "headline1",
          component: "Headline",
          content: {
            title: "Simple Body Title",
          },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "space", value: "40px" },
            fontWeight: { type: "font-weight", value: "900" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "headline2",
          component: "Headline",
          content: {
            title: "Simple Body Subtitle",
          },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "space", value: "32px" },
            fontWeight: { type: "font-weight", value: "bolder" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "text1",
          component: "Text",
          content: { title: "This is a simple body description." },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "dimension", value: "16px" },
            fontWeight: { type: "font-weight", value: "normal" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "button1",
          component: "Button",
          content: { text: "Click Me" },
          styles: {
            buttonBgColor: { type: "color", value: "#22c55e" },
            buttonTextColor: { type: "color", value: "#ffffff" },
            paddingY: { type: "space", value: "8px" },
            paddingX: { type: "space", value: "16px" },
            borderRadius: { type: "space", value: "5px" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
      ],
    },
  },
  hero1: {
    styles: {
      backgroundColor: { type: "color", value: "#000C18" }, // Dark purple
      display: { type: "display", value: "flex" },
      flexDirection: { type: "display", value: "column" },
      alignItems: { type: "display", value: "center" },
      justifyContent: { type: "display", value: "center", secondType: "align" },
      navigationBackgroundColor: { type: "color", value: "#000000" },
      navigationDisplay: {
        type: "display",
        value: "flex",
        secondType: "display",
      },
      navigationJustify: {
        type: "display",
        value: "space-between",
        secondType: "justify",
      },
      navigationColor: { type: "color", value: "#ffffff" },
    },
    content: {
    },
    sections: {
      center: [
        {
          id: "headline1",
          component: "Headline",
          content: {
            title: "Hero2 Title",
          },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "space", value: "24px" },
            fontWeight: { type: "font-weight", value: "bold" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "text1",
          component: "Text",
          content: { title: "This is hero1 description" },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "dimension", value: "16px" },
            fontWeight: { type: "font-weight", value: "normal" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "button1",
          component: "Button",
          content: { text: "Click Me" },
          styles: {
            buttonBgColor: { type: "color", value: "#22c55e" },
            buttonTextColor: { type: "color", value: "#ffffff" },
            paddingY: { type: "space", value: "8px" },
            paddingX: { type: "space", value: "16px" },
            borderRadius: { type: "space", value: "5px" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
      ],
    }
  },
  hero2: {
    styles: {
      
      display: { type: "display", value: "flex" },
      flexDirection: { type: "display", value: "column" },
      alignItems: { type: "display", value: "center" },
      justifyContent: { type: "display", value: "center" },
      height: { type: "dimension", value: "500px" },
      imageOpacity: { type: "dimension", value: "0.6" },
      navigationBackgroundColor: { type: "color", value: "#000000" },
      navigationDisplay: { type: "display", value: "flex" },
      navigationJustify: { type: "display", value: "space-between" },
      navigationColor: { type: "color", value: "#ffffff" },
      backgroundColor: { type: "color", value: "#000000" },
    },
    content: {
      imgSrc: "/images/imbg.jpg",
      imageAlt: "Image description",
      buttonText: "Click Me",
      // items: ["Home", "About", "Contact"],
    },
    sections: {
      center: [
        {
          id: "headline1",
          component: "Headline",
          content: {
            title: "Hero2 Title",
          },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "space", value: "24px" },
            fontWeight: { type: "font-weight", value: "bold" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "text1",
          component: "Text",
          content: { title: "This is a hero2 description." },
          styles: {
            textColor: { type: "color", value: "#ffffff" },
            fontSize: { type: "dimension", value: "16px" },
            fontWeight: { type: "font-weight", value: "normal" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "button1",
          component: "Button",
          content: { text: "Click Me" },
          styles: {
            buttonBgColor: { type: "color", value: "#22c55e" },
            buttonTextColor: { type: "color", value: "#ffffff" },
            paddingY: { type: "space", value: "8px" },
            paddingX: { type: "space", value: "16px" },
            borderRadius: { type: "space", value: "5px" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
      ],
    },
  },
  hero3: {
    styles: {
      backgroundColor: { type: "color", value: "#ffffff" },
      textColor: { type: "color", value: "#1f2937" },
      display: { type: "display", value: "flex" },
      // flexDirection: { type: "display", value: "row" },
      // flexWrap: { type: "display", value: "nowrap" },
      alignItems: { type: "display", value: "items-start" },
      justifyContent: { type: "display", value: "justify-start" },
      imageHeight: { type: "dimension", value: "300px" },
      navigationBackgroundColor: { type: "color", value: "#000000" },
      navigationDisplay: { type: "display", value: "flex" },
      navigationJustify: { type: "display", value: "space-between" },
      navigationColor: { type: "color", value: "#ffffff" },
      backgroundSize: {
        type: "background-size",
        value: "cover",
      },
      backgroundPosition: {
        type: "background-position",
        value: "center",
      },
    },
    content: {
      // title: "Invest intelligently with our Innovative Solutions",
      // description: "This is a hero description.",
      imageSrc: "/images/imbg.jpg",
      // imageAlt: "Image description",
      // buttonText: "Click Me",
      // items: ["Home", "About", "Contact"],
    },
    sections: {
      left: [
        {
          id: "headline1",
          component: "Headline",
          content: {
            title: "Invest intelligently with our Innovative Solutions",
          },
          styles: {
            textColor: { type: "color", value: "#1f2937" },
            fontSize: { type: "dimension", value: "24px" },
            fontWeight: { type: "font-weight", value: "bold" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "text1",
          component: "Text",
          content: { title: "This is a hero description." },
          styles: {
            textColor: { type: "color", value: "#1f2937" },
            fontSize: { type: "dimension", value: "16px" },
            fontWeight: { type: "font-weight", value: "normal" },
            textAlign: { type: "text-align", value: "left" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
        {
          id: "button1",
          component: "Button",
          content: { text: "Click Me" },
          styles: {
            buttonBgColor: { type: "color", value: "#22c55e" },
            buttonTextColor: { type: "color", value: "#ffffff" },
            paddingY: { type: "space", value: "8px" },
            paddingX: { type: "space", value: "16px" },
            borderRadius: { type: "space", value: "5px" },
            marginY: { type: "space", value: "16px" },
            marginX: { type: "space", value: "0px" },
          },
        },
      ],
      right: [
        // {
        //   id: "image1",
        //   component: "Image",
        //   content: { imageSrc: "/images/imbg.jpg", alt: "Image description" },
        //   styles: {
        //     imageHeight: { type: "dimension", value: "100%" },
        //     imageWidth: { type: "dimension", value: "100%" },
        //     imageBorderRadius: { type: "space", value: "10px" },
        //     marginY: { type: "space", value: "16px" },
        //     marginX: { type: "space", value: "0px" },
        //     position: { type: "position", value: "absolute" },
        //     coordinates: {type: "position-controller", value : "0 0"},
        //     zIndex: { type: "z-index", value: "-1" },
        //   },
        // },
      ],
    },
  },
  // Add other components' default props here
};
