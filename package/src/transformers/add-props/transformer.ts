import type { API, FileInfo } from "jscodeshift";
import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";
import isTargetJsxNode from "../../utils/jscodeshift/isTargetJsxNode";
import getConvertedImportIdentifierName from "../../utils/jscodeshift/getConvertedImportIdentifierName";

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
  const root = jscodeshift(sourceCode);

  const convertedComponentSource = getConvertedPath({
    type: componentSourceType,
    currentPath: file.path,
    targetPath: componentSource,
  });

  const jsxAttributeNodeFromOption = jscodeshift.jsxAttribute(
    jscodeshift.jsxIdentifier(propsName),
    jscodeshift.jsxExpressionContainer(jscodeshift.literal(propsValue))
  );

  const convertedComponentName = getConvertedImportIdentifierName({
    root,
    jscodeshift,
    source: convertedComponentSource,
    nameType: componentNameType,
    name: componentName,
  });

  if (!convertedComponentName) {
    return root.toSource();
  }

  root
    .find(jscodeshift.JSXOpeningElement)
    .filter(isTargetJsxNode(convertedComponentName))
    .filter((node) => {
      return !node.value.attributes?.some(
        (attribute) =>
          attribute.type === "JSXAttribute" && attribute.name?.name === propsName
      );
    })
    .replaceWith((node)=>{
      return jscodeshift.jsxOpeningElement(node.value.name, [
        ...(node.value.attributes ?? []),
        jsxAttributeNodeFromOption,
      ])
    })

    return root.toSource();
}

export default transformer;
