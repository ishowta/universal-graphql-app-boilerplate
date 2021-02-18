import "react-native-web";
import App from "@app/app/src/App";
import React from "react";
import renderer from "react-test-renderer";

// Note: test renderer must be required after react-native.

it("renders correctly", () => {
  const app = renderer.create(<App />);
  expect(app.toJSON()).toMatchSnapshot();
});
