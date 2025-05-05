import path from "path";

export function getRelativePath(from: string, to: string): string {
  const relativePath = path.relative(path.dirname(from), to);
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

export function isAbsolutePath(pathStr: string): boolean {
  return path.isAbsolute(pathStr);
}

export function isRelativePath(pathStr: string): boolean {
  return !isAbsolutePath(pathStr);
}

export function isFilePath(pathStr: string): boolean {
  return path.extname(pathStr) !== "";
}
