import reportWebVitals from "./reportWebVitals";
import { AppRegistry } from "react-native";
import App from "@app/app/src/App";
import "./index.css";

AppRegistry.registerComponent("myprojectname", () => App);
AppRegistry.runApplication("myprojectname", {
  rootTag: document.getElementById("root"),
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
