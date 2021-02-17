// TODO: Write better code

export {};

const FontAwesomeTTF = require("react-native-vector-icons/Fonts/FontAwesome.ttf");
const EntypoTTF = require("react-native-vector-icons/Fonts/Entypo.ttf");

const IconsCSS = `
@font-face {
  src: url(${FontAwesomeTTF});
  font-family: FontAwesome;
}
@font-face {
  src: url(${EntypoTTF});
  font-family: Entypo;
}
`;

const style = document.createElement("style");
style.type = "text/css";
if ((style as any).styleSheet) (style as any).styleSheet.cssText = IconsCSS;
else style.appendChild(document.createTextNode(IconsCSS));

document.head.appendChild(style);
