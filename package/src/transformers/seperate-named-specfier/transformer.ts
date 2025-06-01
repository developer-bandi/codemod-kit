import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const { sourceType = "absolute", fromSource, toSource, specifier } = options;
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

  const specifierNodes = [specifier].map((specifier) => {
    const identifierNode = jscodeshift.identifier(specifier);

    return jscodeshift.importSpecifier(identifierNode, identifierNode);
  });

  const isToImportDeclarationExist =
    root
      .find(
        jscodeshift.ImportDeclaration,
        (node) => node.source.value === convertedToPath
      )
      .size() > 0;

  // remove target specifiers from fromImportDeclaration
  root
    .find(jscodeshift.ImportSpecifier)
    .filter(
      (node) =>
        typeof node.value.imported.name === "string" &&
        [specifier].includes(node.value.imported.name)
    )
    .filter((node) => node.parent.value.source.value === convertedFromPath)
    .remove()

  // if toImportDeclaration is exist, add specifiers to toImportDeclaration
  if (isToImportDeclarationExist) {
    root
      .find(
        jscodeshift.ImportDeclaration,
        (node) => node.source.value === convertedToPath
      )
      .forEach((node, index) => {
        if (index === 0) {
          node.value.specifiers = node.value.specifiers?.concat(specifierNodes);
        }
      })

    root
      .find(
        jscodeshift.ImportDeclaration,
        (node) =>
          node.specifiers?.length === 0 &&
          node.source.value === convertedFromPath
      )
      .remove()
      
  // if toImportDeclaration is not exist, insert new toImportDeclaration
  }else{
    root
      .find(jscodeshift.ImportDeclaration)
      .filter((node, index) => index === 0)
      .insertBefore(
        jscodeshift.importDeclaration(
          specifierNodes,
          jscodeshift.literal(convertedToPath)
      )
    )

    root
      .find(
        jscodeshift.ImportDeclaration,
        (node) =>
          node.specifiers?.length === 0 && node.source.value === convertedFromPath
      )
      .remove()
  }

  return root.toSource();
}

export default transformer;
