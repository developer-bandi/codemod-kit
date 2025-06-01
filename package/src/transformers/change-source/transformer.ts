import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";

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
    .replaceWith((node)=>jscodeshift.importDeclaration(node.value.specifiers, jscodeshift.literal(convertedToPath)))

  root
    .find(jscodeshift.CallExpression, (node) => node.callee.type === "Import")
    .filter(
      (node) =>
        node.value.arguments[0].type === "StringLiteral" &&
        node.value.arguments[0].value === options.fromSource
    )
    .replaceWith(()=>jscodeshift.callExpression(jscodeshift.identifier("import"), [jscodeshift.literal(options.toSource)]))

  return root.toSource();
}

export default transformer;
