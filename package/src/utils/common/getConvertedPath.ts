import path from "path";

export function generateRelativePath(from: string, to: string): string {
  const relativePath = path.relative(path.dirname(from), to);
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

export interface GetConvertedPathParams {
  type?: "relative" | "absolute";
  currentPath: string;
  targetPath: string;
}

function getConvertedPath({
  type,
  currentPath,
  targetPath,
}: GetConvertedPathParams) {
  const absoulteCurrentFileName = path.join(process.cwd(), currentPath);

  return type === "relative"
    ? generateRelativePath(absoulteCurrentFileName, targetPath)
    : targetPath;
}

export default getConvertedPath;
