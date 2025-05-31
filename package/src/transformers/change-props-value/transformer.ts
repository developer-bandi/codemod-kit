import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/getConvertedPath";
import type { API, FileInfo } from "jscodeshift";
import generateLiteralNode from "../../utils/jscodeshift/generateLiteralNode";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;

  const {
    componentSourceType = "absolute",
    componentNameType = "default",
    componentSource,
    componentName,
    propsName,
    propsValue,
  } = options;

  const convertedComponentSource = getConvertedPath({
    type: componentSourceType,
    currentPath: file.path,
    targetPath: componentSource,
  });

  let convertedComponentName: null | string = null;

  jscodeshift(sourceCode)
    .find(jscodeshift.ImportDeclaration)
    .filter((node) => node.value.source.value === convertedComponentSource)
    .forEach((node) => {
      node.value.specifiers?.forEach((specifier) => {
        if (
          specifier.type === "ImportDefaultSpecifier" &&
          componentNameType === "default"
        ) {
          return (convertedComponentName =
            specifier.local?.type === "Identifier"
              ? specifier.local.name
              : componentName);
        }

        if (
          specifier.type === "ImportSpecifier" &&
          componentNameType === "named" &&
          specifier.imported.type === "Identifier" &&
          specifier.imported.name === componentName
        ) {
          return (convertedComponentName =
            specifier.local?.type === "Identifier"
              ? specifier.local.name
              : componentName);
        }

        if (
          specifier.type === "ImportNamespaceSpecifier" &&
          componentNameType === "default"
        ) {
          return (convertedComponentName =
            specifier.local?.type === "Identifier"
              ? specifier.local.name
              : componentName);
        }

        if (
          specifier.type === "ImportNamespaceSpecifier" &&
          componentNameType === "named"
        ) {
          return (convertedComponentName = componentName);
        }
      });
    });

  if (!convertedComponentName) {
    return sourceCode;
  }

  return jscodeshift(sourceCode)
    .find(jscodeshift.JSXOpeningElement)
    .filter((node) => {
      return (
        (node.value.name.type === "JSXIdentifier" &&
          node.value.name.name === convertedComponentName &&
          node.scope.isGlobal) ||
        (node.value.name.type === "JSXMemberExpression" &&
          node.value.name.property.name === convertedComponentName)
      );
    })
    .forEach((node) => {
      const attribute = node.value.attributes?.find(
        (attribute) =>
          attribute.type === "JSXAttribute" && attribute.name.name === propsName
      );

      if (attribute?.type === "JSXAttribute") {
        attribute.value = jscodeshift.jsxExpressionContainer(
          generateLiteralNode(propsValue)
        );
      }
    })
    .toSource();
}

export default transformer;
