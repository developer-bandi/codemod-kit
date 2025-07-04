import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";
import type { API, FileInfo } from "jscodeshift";
import getConvertedImportIdentifierName from "../../utils/jscodeshift/getConvertedImportIdentifierName";
import isTargetJsxNode from "../../utils/jscodeshift/isTargetJsxNode";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const {
    componentSourceType = "absolute",
    componentNameType = "default",
    componentSource,
    componentName,
    fromPropsName,
    toPropsName,
  } = options;
  const root = jscodeshift(sourceCode);

  const convertedComponentSource = getConvertedPath({
    type: componentSourceType,
    currentPath: file.path,
    targetPath: componentSource,
  });

  const convertedComponentName = getConvertedImportIdentifierName({
    root,
    jscodeshift,
    source: convertedComponentSource,
    nameType: componentNameType,
    name: componentName,
  });

  if (!convertedComponentName) {
    return sourceCode;
  }

  root
    .find(jscodeshift.JSXOpeningElement)
    .filter(isTargetJsxNode(convertedComponentName))
    .replaceWith((node)=>{
      const attributes = node.value.attributes?.map((attribute)=>{
        if(attribute.type === "JSXAttribute" && attribute.name.name === fromPropsName){
          attribute.name.name = toPropsName;
        }
        return attribute;
      });

      return jscodeshift.jsxOpeningElement(node.value.name, attributes,node.value.selfClosing);
    })

    return root.toSource()
}

export default transformer;
