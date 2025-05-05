import { getRelativePath } from "./determinPath";
import path from "path";

export interface GetConvertedPathParams {
  type?: "relative" | "absolute";
  currentPath: string;
  targetPath: string;
}

export function getConvertedPath({
  type,
  currentPath,
  targetPath,
}: GetConvertedPathParams) {
  const absoulteCurrentFileName = path.join(process.cwd(), currentPath);

  return type === "relative"
    ? getRelativePath(absoulteCurrentFileName, targetPath)
    : targetPath;
}
