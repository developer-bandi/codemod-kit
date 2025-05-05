import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";

import path from "path";
import { globSync } from "glob";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transformerFiles = globSync(
  path.join(__dirname, "src", "transformers", "**", "transformer.ts")
);

const external = [
  "jscodeshift",
  "path",
  "fs",
  "util",
  "events",
  "stream",
  "jscodeshift/src/Runner",
];

export default [
  {
    input: "src/browser.ts",
    output: {
      file: "dist/browser.js",
      format: "es",
    },
    plugins: [
      del({ targets: "dist" }),
      copy({
        targets: [
          { src: "./package.json", dest: "dist" },
          { src: "./README.md", dest: "dist" },
        ],
      }),
      nodePolyfills(),
      typescript(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      json(),
    ],
  },
  {
    input: "src/programmatic.ts",
    output: {
      file: "dist/programmatic.js",
      format: "cjs",
    },
    external,
    plugins: [resolve(), commonjs(), json(), typescript()],
  },
  {
    input: "src/cli.ts",
    output: {
      file: "dist/cli.js",
      format: "cjs",
    },
    external,
    plugins: [resolve(), commonjs(), json(), typescript()],
  },
  {
    input: "src/browser.ts",
    output: {
      file: "dist/browser.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
  {
    input: "src/programmatic.ts",
    output: {
      file: "dist/programmatic.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
  {
    input: transformerFiles,
    output: {
      dir: "dist/transformers",
      format: "cjs",
      entryFileNames: (chunkInfo) => {
        const filePath = chunkInfo.facadeModuleId;
        if (!filePath) return "[name].js";

        const pathParts = filePath.split(path.sep);

        const transformerIndex = pathParts.findIndex(
          (part) => part === "transformer.ts"
        );
        if (transformerIndex !== -1 && transformerIndex > 0) {
          const dirName = pathParts[transformerIndex - 1];
          return `${dirName}.js`;
        }

        return "[name].js";
      },
      exports: "named",
    },
    external,
    plugins: [resolve(), commonjs(), typescript()],
  },
];
