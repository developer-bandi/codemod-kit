import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/getConvertedPath";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const { sourceType = "absolute", fromSource, toSource } = options;
  const root = jscodeshift(sourceCode);

  const convertedFromPath = getConvertedPath({
    type: sourceType,
    currentPath: file.path,
    targetPath: fromSource,
  });

  const convertedToPath = getConvertedPath({
    type: sourceType,
    currentPath: file.path,
    targetPath: toSource,
  });

  root
    .find(jscodeshift.ImportDeclaration)
    .filter((node) => node.value.source.value === convertedFromPath)
    .forEach((node) => (node.value.source.value = convertedToPath));

  root
    .find(jscodeshift.CallExpression, (node) => node.callee.type === "Import")
    .filter(
      (node) =>
        node.value.arguments[0].type === "StringLiteral" &&
        node.value.arguments[0].value === options.fromSource
    )
    .forEach(
      (node) =>
        node.value.arguments[0].type === "StringLiteral" &&
        (node.value.arguments[0].value = options.toSource)
    );

  return root.toSource();
}

export default transformer;
