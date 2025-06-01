import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";
import type { API, FileInfo } from "jscodeshift";
import generateLiteralNode from "../../utils/jscodeshift/generateLiteralNode";
import getConvertedIdentifierName from "../../utils/jscodeshift/getConvertedImportIdentifierName";
import isTargetJsxNode from "src/utils/jscodeshift/isTargetJsxNode";

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

  const convertedComponentName = getConvertedIdentifierName({
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
    .replaceWith((node)=>{
      return jscodeshift.jsxOpeningElement( 
        node.value.name, 
        node.value.attributes?.map((attribute)=>{
        if(attribute.type === "JSXAttribute" && attribute.name.name === propsName){
          attribute.value = jscodeshift.jsxExpressionContainer(
            generateLiteralNode(propsValue)
          );
        }
        return attribute;
      }
    ),
    node.value.selfClosing
    );
    })

  return root.toSource();
}

export default transformer;
