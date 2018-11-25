require("dotenv").config()
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import { resolve } from "path"
import { Configuration } from "webpack"

const dirname = __dirname
const { NODE_ENV, WDS_PORT } = process.env
const IS_PROD = NODE_ENV === "production"
const ROOT_DIR = resolve(dirname, "..", "..")
const EXAMPLE_DIR = resolve(ROOT_DIR, "example")
const SRC_DIR = resolve(ROOT_DIR, "src")
const DIST_DIR = resolve(EXAMPLE_DIR, "dist")
const EXAMPLE_OUTPUT_PATH = WDS_PORT ? `http://localhost:${WDS_PORT}/dist/` : "/dist/"

const stats: Configuration["stats"] = {
  // https://github.com/TypeStrong/ts-loader/issues/751
  warningsFilter: /export .* was not found in/,
  colors: true
}

const config: Configuration = {
  entry: { example: resolve(EXAMPLE_DIR, "index.tsx") },
  devServer: {
    contentBase: EXAMPLE_DIR,
    publicPath: EXAMPLE_OUTPUT_PATH,
    compress: false,
    port: Number(WDS_PORT),
    stats
  },
  devtool: IS_PROD ? "source-map" : "cheap-module-eval-source-map",
  mode: IS_PROD ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // https://github.com/TypeStrong/ts-loader#loader-options
            configFile: resolve(ROOT_DIR, "tsconfig.json"),
            transpileOnly: true,
            happyPackMode: true,
            compilerOptions: {
              // IMPORTANT! target is ES5 for production
              target: IS_PROD ? "ES2015" : "ES2018"
            },
            experimentalWatchApi: true // https://webpack.js.org/guides/build-performance/#typescript-loader
          }
        },
        exclude: [/node_modules/],
        include: [EXAMPLE_DIR, SRC_DIR]
      }
    ]
  },
  output: {
    filename: `[name].js`,
    // filename: `[name]${IS_PROD ? ".[chunkhash:6]" : ".[hash:6]"}.js`,
    chunkFilename: `[name].[chunkhash:6].js`,
    path: DIST_DIR,
    publicPath: EXAMPLE_OUTPUT_PATH,
    pathinfo: false // https://webpack.js.org/guides/build-performance/#output-without-path-info
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false
  },
  stats,
  watchOptions: {
    ignored: /node_modules/
  }
}

export default config
