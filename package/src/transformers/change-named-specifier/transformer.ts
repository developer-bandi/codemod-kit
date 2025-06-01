import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";
import isIdentifierNodeGlobalScope from "../../utils/jscodeshift/isNodeGlobalScope";
import isImportDeclarationHasTargetSource from "../../utils/jscodeshift/isImportDeclarationHasTargetSource";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const {
    sourceType = "absolute",
    fromSpecifier,
    toSpecifier,
    source,
  } = options;
  const root = jscodeshift(sourceCode);

  const convertedSourcePath = getConvertedPath({
    type: sourceType,
    currentPath: file.path,
    targetPath: source,
  });

  const targetImportNodes =
    root
      .find(jscodeshift.ImportDeclaration)
      .filter(isImportDeclarationHasTargetSource(convertedSourcePath))
      .filter((node) => {
        return !!node.value.specifiers?.some(
          (specifier) =>
            specifier.type === "ImportSpecifier" &&
            specifier.imported.name === fromSpecifier
        );
      });

  const isSourceFileIncludeTargetImportNode = targetImportNodes.size() >= 1;

  if (!isSourceFileIncludeTargetImportNode) {
    return root.toSource();
  }

  root
    .find(jscodeshift.Identifier, (node) => node.name === fromSpecifier)
    .filter((node) => {
      const parentNodeType = node.parentPath.value.type;

      return !["MemberExpression", "OptionalMemberExpression"].includes(
        parentNodeType
      );
    })
    .filter(isIdentifierNodeGlobalScope)
    .replaceWith(jscodeshift.identifier(toSpecifier));

  return root.toSource();
}

export default transformer;
