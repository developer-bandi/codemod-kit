import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import { getConvertedPath } from "../../../utils/getConvertedPath";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const {
    sourceType = "absolute",
    fromSpecifier,
    toSpecifier,
    source,
  } = options;

  const convertedSourcePath = getConvertedPath({
    type: sourceType,
    currentPath: file.path,
    targetPath: source,
  });

  const isIncludeTargetImport =
    jscodeshift(sourceCode)
      .find(jscodeshift.ImportDeclaration)
      .filter((node) => {
        return (
          node.value.source.value === convertedSourcePath &&
          !!node.value.specifiers?.some(
            (specifier) =>
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === fromSpecifier
          )
        );
      })
      .size() >= 1;

  if (!isIncludeTargetImport) {
    return sourceCode;
  }

  return jscodeshift(sourceCode)
    .find(jscodeshift.Identifier, (node) => node.name === fromSpecifier)
    .filter((node) => {
      const parentNodeType = node.parentPath.value.type;

      return !["MemberExpression", "OptionalMemberExpression"].includes(
        parentNodeType
      );
    })
    .filter((node) => node.scope.isGlobal)
    .replaceWith(jscodeshift.identifier(toSpecifier))
    .toSource();
}

export default transformer;
