const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isPublicHostname = (hostname) =>
  hostname.includes(".") &&
  !hostname.endsWith(".") &&
  !hostname.endsWith(".localhost") &&
  !hostname.startsWith("[") &&
  !/^[\d.]+$/.test(hostname);

const parseSiteUrl = (value) => {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }
  const invalid = () =>
    new Error(
      `SITE_URL must be a public HTTPS origin such as https://example.com, without a path, query, or fragment. Received: ${JSON.stringify(value)}`,
    );
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw invalid();
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    !isPublicHostname(url.hostname)
  ) {
    throw invalid();
  }
  return url.origin;
};

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      templateParameters: {
        siteUrl: parseSiteUrl(process.env.SITE_URL),
      },
    }),
  ],
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    historyApiFallback: true,
    open: false,
    hot: true,
  },
};

