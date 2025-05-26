import path from "path";

function getRelativePath(from: string, to: string): string {
  const relativePath = path.relative(path.dirname(from), to);
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

export default getRelativePath;
