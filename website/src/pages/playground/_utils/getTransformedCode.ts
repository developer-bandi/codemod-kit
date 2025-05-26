import { transformMap } from "codemod-kit/browser";
import jscodeshift from "jscodeshift";

const getTransformedCode = ({
  code,
  transformerCategory,
  transformerOption,
}: {
  code: string;
  transformerCategory: string;
  transformerOption: object;
}) => {
  try {
    const result = transformMap[transformerCategory](
      {
        path: "test.tsx",
        source: code,
      },
      {
        jscodeshift: jscodeshift.withParser("tsx"),
        j: jscodeshift.withParser("tsx"),
        report: (msg: string) => msg,
        stats: () => ({}),
      },
      transformerOption
    );
    return {
      type: "success",
      result: result,
    };
  } catch (e) {
    console.log(e.message);
    return {
      type: "error",
      result: e.message,
    };
  }
};

export default getTransformedCode;
