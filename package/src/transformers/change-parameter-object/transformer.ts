import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/common/getConvertedPath";
import type { API, FileInfo } from "jscodeshift";
import isNodeGlobalScope from "../../utils/jscodeshift/isNodeGlobalScope";
import getConvertedImportIdentifierName from "src/utils/jscodeshift/getConvertedImportIdentifierName";
import isTargetFunctionCall from "src/utils/jscodeshift/isTargetFunctionCall";

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
  const root = jscodeshift(sourceCode);

  const convertedComponentSource = getConvertedPath({
    type: functionSourceType,
    currentPath: file.path,
    targetPath: functionSource,
  });

  const convertedComponentName = getConvertedImportIdentifierName({
    root,
    jscodeshift,
    source: convertedComponentSource,
    nameType: functionNameType,
    name: functionName,
  });

  if (!convertedComponentName) {
    return root.toSource();
  }

  return root
    .find(jscodeshift.CallExpression)
    .filter(isTargetFunctionCall(convertedComponentName))
    .filter(isNodeGlobalScope)
    .replaceWith((node)=>{
      return jscodeshift.callExpression(node.value.callee, [
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
      ]);
    })
    .toSource();
}

export default transformer;
