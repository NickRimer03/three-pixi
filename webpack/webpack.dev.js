import { merge } from "webpack-merge";
import commonConfiguration from "./webpack.common.js";
import portFinderSync from "portfinder-sync";

export default merge(commonConfiguration, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: "auto",
    client: {
      logging: "none",
      overlay: true,
    },
    static: {
      watch: true,
    },
    watchFiles: ["src/**/*.js"],
  },
});
