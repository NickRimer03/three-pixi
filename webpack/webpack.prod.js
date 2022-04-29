import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import commonConfiguration from "./webpack.common.js";

export default merge(commonConfiguration, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
});
