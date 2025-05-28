import * as lz from "lz-string";

export default function writeQueryParam<T>(value: T): string {
  const parsedData = JSON.stringify(value);

  return (value && lz.compressToEncodedURIComponent(parsedData)) ?? "";
}
