import { ASTPath } from "jscodeshift";
import { namedTypes } from "ast-types";

function isImportDeclarationHasTargetSource(source: string) {
  return (node: ASTPath<namedTypes.ImportDeclaration>) => {
    return node.value.source.value === source;
  };
}

export default isImportDeclarationHasTargetSource;
