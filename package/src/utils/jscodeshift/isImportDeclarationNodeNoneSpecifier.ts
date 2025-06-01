import { ASTPath } from "jscodeshift";
import { namedTypes } from "ast-types";

function isImportDeclarationNodeNoneSpecifier(node: ASTPath<namedTypes.ImportDeclaration>) {
  return !node.value.specifiers?.length;
}

export default isImportDeclarationNodeNoneSpecifier;
