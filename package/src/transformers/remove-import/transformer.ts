import type { API, FileInfo } from "jscodeshift";

import { OptionsSchema } from "./optionsSchema";
import getConvertedPath from "../../utils/getConvertedPath";

function transformer(file: FileInfo, api: API, options: OptionsSchema) {
  const sourceCode = file.source;
  const jscodeshift = api.jscodeshift;
  const { sourceType = "absolute", source } = options;
  const root = jscodeshift(sourceCode);

  const convertedToPath = getConvertedPath({
    type: sourceType,
    currentPath: file.path,
    targetPath: source,
  });

  return root
    .find(jscodeshift.ImportDeclaration)
    .filter(
      (node) =>
        node.value.source.value === convertedToPath &&
        !node.value.specifiers?.length
    )
    .remove()
    .toSource();
}

export default transformer;
