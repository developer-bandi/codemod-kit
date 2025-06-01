import { ASTPath } from "jscodeshift";
import { namedTypes } from "ast-types";

function isTargetJsxNode(name: string) {
  return (node: ASTPath<namedTypes.JSXOpeningElement>) => {
    return (
      (node.value.name.type === "JSXIdentifier" &&
        node.value.name.name === name &&
        node.scope.isGlobal) ||
            (node.value.name.type === "JSXMemberExpression" &&
              node.value.name.property.name === name)
          );
    }
}

export default isTargetJsxNode;
