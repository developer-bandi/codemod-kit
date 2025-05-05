import jscodeshift, { Options } from "jscodeshift";

const getTransformParms = <T extends Options>({
  input,
  options,
  path,
  parser = "tsx",
}: {
  input: string;
  options: T;
  path?: string;
  parser?: "tsx" | "ts";
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
