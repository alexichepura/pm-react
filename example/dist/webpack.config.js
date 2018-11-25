"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path_1 = require("path");
const dirname = __dirname;
const { NODE_ENV, WDS_PORT } = process.env;
const IS_PROD = NODE_ENV === "production";
const ROOT_DIR = path_1.resolve(dirname, "..", "..");
const EXAMPLE_DIR = path_1.resolve(ROOT_DIR, "example");
const SRC_DIR = path_1.resolve(ROOT_DIR, "src");
const DIST_DIR = path_1.resolve(EXAMPLE_DIR, "dist");
const EXAMPLE_OUTPUT_PATH = WDS_PORT ? `http://localhost:${WDS_PORT}/dist/` : "/dist/";
const stats = {
    // https://github.com/TypeStrong/ts-loader/issues/751
    warningsFilter: /export .* was not found in/,
    colors: true
};
const config = {
    entry: { example: path_1.resolve(EXAMPLE_DIR, "index.tsx") },
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
                        configFile: path_1.resolve(ROOT_DIR, "tsconfig.json"),
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
};
exports.default = config;
