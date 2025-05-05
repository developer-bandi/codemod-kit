import { OptionsSchema as AddPropsOptionsSchema } from "./transformers/component/add-props/optionsSchema";
import { OptionsSchema as ChangePropsNameOptionsSchema } from "./transformers/component/change-props-name/optionsSchema";
import { OptionsSchema as ChangePropsValueOptionsSchema } from "./transformers/component/change-props-value/optionsSchema";
import { OptionsSchema as RemovePropsOptionsSchema } from "./transformers/component/remove-props/optionsSchema";
import { OptionsSchema as ChangeNamedSpecifierOptionsSchema } from "./transformers/import/change-named-specifier/optionsSchema";
import { OptionsSchema as ChangeSourceOptionsSchema } from "./transformers/import/change-source/optionsSchema";
import { OptionsSchema as RemoveImportOptionsSchema } from "./transformers/import/remove-import/optionsSchema";
import { OptionsSchema as SeperateNamedSpecifierOptionsSchema } from "./transformers/import/seperate-named-specfier/optionsSchema";

import path from "path";
import jscodeshiftRunner from "jscodeshift/src/Runner";

const defaultJscodeshiftOptions = {
  parser: "tsx",
};

export const transformer =
  <T extends object>(transformType: string) =>
  (
    toConvertPaths: string | string[],
    customOptions: T,
    jscodeshiftOptions?: typeof defaultJscodeshiftOptions
  ) => {
    const paths = Array.isArray(toConvertPaths)
      ? toConvertPaths
      : [toConvertPaths];

    const options = {
      ...defaultJscodeshiftOptions,
      ...customOptions,
      ...(jscodeshiftOptions ?? {}),
    };

    // 변환기 파일 경로를 CommonJS 형식에 맞게 수정
    const transformFilePath = path.join(
      __dirname,
      "transformers",
      `${transformType}.js`
    );

    try {
      jscodeshiftRunner
        .run(transformFilePath, paths, options)
        .catch((error) => {
          console.error("Transform failed:", error);
          process.exit(1);
        });
    } catch (error) {
      console.error("Error running transform:", error);
      process.exit(1);
    }
  };

export const transformMap = {
  "add-props": transformer<AddPropsOptionsSchema>("add-props"),
  "change-props-name":
    transformer<ChangePropsNameOptionsSchema>("change-props-name"),
  "change-props-value":
    transformer<ChangePropsValueOptionsSchema>("change-props-value"),
  "remove-props": transformer<RemovePropsOptionsSchema>("remove-props"),
  "change-named-specifier": transformer<ChangeNamedSpecifierOptionsSchema>(
    "change-named-specifier"
  ),
  "change-source": transformer<ChangeSourceOptionsSchema>("change-source"),
  "remove-import": transformer<RemoveImportOptionsSchema>("remove-import"),
  "seperate-named-specifier": transformer<SeperateNamedSpecifierOptionsSchema>(
    "seperate-named-specifier"
  ),
};
