import * as lz from "lz-string";

export default function readQueryParam<T>(value: string | null): T {
  const encodedString = lz.decompressFromEncodedURIComponent(value);

  return JSON.parse(encodedString);
}
