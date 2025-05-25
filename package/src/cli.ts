#!/usr/bin/env node

import path from "path";
import jscodeshiftRunner from "jscodeshift/src/Runner";
import inquirer from "inquirer";

import { optionsSchema as addPropsOptionsSchema } from "./transformers/component/add-props/optionsSchema";
import { optionsSchema as changePropsNameOptionsSchema } from "./transformers/component/change-props-name/optionsSchema";
import { optionsSchema as changePropsValueOptionsSchema } from "./transformers/component/change-props-value/optionsSchema";
import { optionsSchema as removePropsOptionsSchema } from "./transformers/component/remove-props/optionsSchema";
import { optionsSchema as changeNamedSpecifierOptionsSchema } from "./transformers/import/change-named-specifier/optionsSchema";
import { optionsSchema as changeSourceOptionsSchema } from "./transformers/import/change-source/optionsSchema";
import { optionsSchema as removeImportOptionsSchema } from "./transformers/import/remove-import/optionsSchema";
import { optionsSchema as seperateNamedSpecifierOptionsSchema } from "./transformers/import/seperate-named-specfier/optionsSchema";

const transformTypeSchemaMap = {
  "add-props": addPropsOptionsSchema,
  "change-props-name": changePropsNameOptionsSchema,
  "change-props-value": changePropsValueOptionsSchema,
  "remove-props": removePropsOptionsSchema,
  "change-named-specifier": changeNamedSpecifierOptionsSchema,
  "change-source": changeSourceOptionsSchema,
  "remove-import": removeImportOptionsSchema,
  "seperate-named-specifier": seperateNamedSpecifierOptionsSchema,
};

type TransformType = keyof typeof transformTypeSchemaMap;

async function runCLI() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the transformer type",
        choices: Object.keys(transformTypeSchemaMap),
      },
      {
        type: "input",
        name: "path",
        message:
          "Enter the path to the file or directory to transform split by comma(,)",
      },
      {
        type: "list",
        name: "parser",
        message: "Select the parser",
        default: "tsx",
        choices: ["babel", "flow", "tsx", "ts"],
      },
      {
        type: "editor",
        name: "options",
        message: "Enter the options that match the type in JSON format.",
      },
    ]);

    const type = answers.type as TransformType;
    const paths = answers.path.split(",");
    const parser = answers.parser;
    const options = transformTypeSchemaMap[type].parse(
      JSON.parse(answers.options.trim())
    );

    const transformFilePath = path.join(
      __dirname,
      "transformers",
      `${type}.js`
    );

    const jscodeshiftOptions = {
      parser,
      ...options,
    };

    jscodeshiftRunner.run(transformFilePath, paths, jscodeshiftOptions);
  } catch (error) {
    console.error("Error running transform:", error);
    process.exit(1);
  }
}

runCLI();
