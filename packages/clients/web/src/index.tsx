import App from "@app/app/src/App";
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppRegistry } from "react-native";
import reportWebVitals from "./reportWebVitals";

AppRegistry.registerComponent('App', () => {
  return App;
});
AppRegistry.runApplication('App', {
  rootTag: document.querySelector("#root"),
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals().catch((error) => {
  throw new Error(error);
});
