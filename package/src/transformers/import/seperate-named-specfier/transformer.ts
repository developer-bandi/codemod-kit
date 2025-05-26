import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../../utils/getConvertedPath";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const { sourceType = "absolute", fromSource, toSource, specifier } = options;

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

  const specifierNodes = [specifier].map((specifier) => {
    const identifierNode = jscodeshift.identifier(specifier);

    return jscodeshift.importSpecifier(identifierNode, identifierNode);
  });

  const isToImportDeclarationExist =
    jscodeshift(sourceCode)
      .find(
        jscodeshift.ImportDeclaration,
        (node) => node.source.value === convertedToPath
      )
      .size() > 0;

  const removedTargetImportSpecifiers = jscodeshift(sourceCode)
    .find(jscodeshift.ImportSpecifier)
    .filter(
      (node) =>
        typeof node.value.imported.name === "string" &&
        [specifier].includes(node.value.imported.name)
    )
    .filter((node) => node.parent.value.source.value === convertedFromPath)
    .remove()
    .toSource();

  if (isToImportDeclarationExist) {
    const insertedNewSpecifiers = jscodeshift(removedTargetImportSpecifiers)
      .find(
        jscodeshift.ImportDeclaration,
        (node) => node.source.value === convertedToPath
      )
      .forEach((node, index) => {
        if (index === 0) {
          node.value.specifiers = node.value.specifiers?.concat(specifierNodes);
        }
      })
      .toSource();

    return jscodeshift(insertedNewSpecifiers)
      .find(
        jscodeshift.ImportDeclaration,
        (node) =>
          node.specifiers?.length === 0 &&
          node.source.value === convertedFromPath
      )
      .remove()
      .toSource();
  }

  const insertednewImportDeclaration = jscodeshift(
    removedTargetImportSpecifiers
  )
    .find(jscodeshift.ImportDeclaration)
    .filter((node, index) => index === 0)
    .insertBefore(
      jscodeshift.importDeclaration(
        specifierNodes,
        jscodeshift.literal(convertedToPath)
      )
    )
    .toSource();

  return jscodeshift(insertednewImportDeclaration)
    .find(
      jscodeshift.ImportDeclaration,
      (node) =>
        node.specifiers?.length === 0 && node.source.value === convertedFromPath
    )
    .remove()
    .toSource();
}

export default transformer;
