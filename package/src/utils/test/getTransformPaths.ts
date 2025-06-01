import jscodeshift, { Options } from "jscodeshift";

export type Parser = "babel" | "flow" | "tsx" | "ts";

const getTransformParms = <T extends Options>({
  input,
  options,
  path,
  parser = "tsx",
}: {
  input: string;
  options: T;
  path?: string;
  parser?: Parser;
}) => {
  return [
    {
      path: path ?? `test.${parser}`,
      source: input,
    },
    {
      jscodeshift: jscodeshift.withParser(parser),
      j: jscodeshift.withParser(parser),
      report: (msg: string) => msg,
      stats: () => ({}),
    },
    options,
  ] as const;
};

export default getTransformParms;
