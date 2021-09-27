const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "medium",
    projectName: "page2",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new ModuleFederationPlugin({
        name: "page2",
        filename: "remoteEntry.js",
        remotes: {},
        library: { type: "var", name: "page2" },
        library: { type: "system" },
        exposes: {
          "./Abc": "./src/Abc",
        },
        shared: ["react", "react-dom"],
      }),
      // new HtmlWebPackPlugin({
      //   template: "./src/index.html",
      // }),
    ],
  });
};
