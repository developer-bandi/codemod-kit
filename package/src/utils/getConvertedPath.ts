import generateRelativePath from "./generateRelativePath";
import path from "path";

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
