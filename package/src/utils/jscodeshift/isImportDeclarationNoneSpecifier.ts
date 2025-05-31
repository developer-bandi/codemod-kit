import { ASTPath } from "jscodeshift";
import { namedTypes } from "ast-types";

function isImportDeclarationNoneSpecifier(
  node: ASTPath<namedTypes.ImportDeclaration>
) {
  return !node.value.specifiers?.length;
}

export default isImportDeclarationNoneSpecifier;
