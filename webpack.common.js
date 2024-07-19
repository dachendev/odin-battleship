import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const __dirname = import.meta.dirname;

export default {
  entry: "./src/main.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // Uncomment this if you have multiple entry points
  // optimization: {
  //     runtimeChunk: 'single',
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
