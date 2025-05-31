import jscodeshift from "jscodeshift";

function generateLiteralNode(
  value: string | number | boolean | RegExp | bigint | null
) {
  if (typeof value === "string") {
    return jscodeshift.stringLiteral(value);
  }

  if (typeof value === "boolean") {
    return jscodeshift.booleanLiteral(value);
  }

  if (typeof value === "number") {
    return jscodeshift.numericLiteral(value);
  }

  return jscodeshift.literal(value);
}

export default generateLiteralNode;
