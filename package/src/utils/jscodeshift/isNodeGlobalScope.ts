import { ASTPath } from "jscodeshift";
import { namedTypes } from "ast-types";

function isNodeGlobalScope(node: ASTPath<namedTypes.Identifier>|ASTPath<namedTypes.CallExpression>) {
  return node.scope.isGlobal;
}

export default isNodeGlobalScope;