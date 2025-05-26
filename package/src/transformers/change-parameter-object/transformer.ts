import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/getConvertedPath";
import type { API, FileInfo } from "jscodeshift";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;

  const {
    functionSourceType = "absolute",
    functionNameType = "default",
    functionSource,
    functionName,
    objectKeys,
  } = options;

  const convertedComponentSource = getConvertedPath({
    type: functionSourceType,
    currentPath: file.path,
    targetPath: functionSource,
  });

  let convertedComponentName: null | string = null;

  jscodeshift(sourceCode)
    .find(jscodeshift.ImportDeclaration)
    .filter((node) => node.value.source.value === convertedComponentSource)
    .forEach((node) => {
      node.value.specifiers?.forEach((specifier) => {
        if (
          specifier.type === "ImportDefaultSpecifier" &&
          functionNameType === "default"
        ) {
          return (convertedComponentName =
            specifier.local?.type === "Identifier"
              ? specifier.local.name
              : functionName);
        }

        if (
          specifier.type === "ImportSpecifier" &&
          functionNameType === "named" &&
          specifier.imported.type === "Identifier" &&
          specifier.imported.name === functionName
        ) {
          return (convertedComponentName =
            specifier.local?.type === "Identifier"
              ? specifier.local.name
              : functionName);
        }

        if (
          specifier.type === "ImportNamespaceSpecifier" &&
          functionNameType === "default"
        ) {
          return (convertedComponentName =
            specifier.local?.type === "Identifier"
              ? specifier.local.name
              : functionName);
        }

        if (
          specifier.type === "ImportNamespaceSpecifier" &&
          functionNameType === "named"
        ) {
          return (convertedComponentName = functionName);
        }
      });
    });

  if (!convertedComponentName) {
    return sourceCode;
  }

  console.log(convertedComponentName);

  return jscodeshift(sourceCode)
    .find(jscodeshift.CallExpression)
    .filter((node) => {
      return (
        node.value.callee.type === "Identifier" &&
        node.value.callee.name === convertedComponentName &&
        node.scope.isGlobal
      );
    })
    .forEach((node) => {
      console.log(node.value.arguments);
      node.value.arguments = [
        jscodeshift.objectExpression(
          node.value.arguments
            .filter((argument) => argument.type !== "SpreadElement")
            .map((argument, index) => {
              return jscodeshift.objectProperty(
                jscodeshift.literal(objectKeys[index]),
                argument
              );
            })
            .filter(Boolean)
        ),
      ];
    })
    .toSource();
}

export default transformer;
