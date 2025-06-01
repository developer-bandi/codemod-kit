import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";
import isImportDeclarationNodeNoneSpecifier from "../../utils/jscodeshift/isImportDeclarationNodeNoneSpecifier";
import isImportDeclarationHasTargetSource from "../../utils/jscodeshift/isImportDeclarationHasTargetSource";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const { sourceType = "absolute", source } = options;
  const root = jscodeshift(sourceCode);

  const convertedSourcePath = getConvertedPath({
    type: sourceType,
    currentPath: file.path,
    targetPath: source,
  });

  root
    .find(jscodeshift.ImportDeclaration)
    .filter(isImportDeclarationNodeNoneSpecifier)
    .filter(isImportDeclarationHasTargetSource(convertedSourcePath))
    .remove()

  return root.toSource();
}

export default transformer;
