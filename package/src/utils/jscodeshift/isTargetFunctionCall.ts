import { ASTPath } from "jscodeshift";
import { namedTypes } from "ast-types";

function isTargetFunctionCall(name: string) {
    return (node: ASTPath<namedTypes.CallExpression>) => {
        return node.value.callee.type === "Identifier" && node.value.callee.name === name;
    }
}

export default isTargetFunctionCall;
