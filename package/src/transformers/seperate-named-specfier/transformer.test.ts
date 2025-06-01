import { it, expect, describe } from "vitest";
import path from "path";

import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../utils/test/getTransformPaths";

describe("seperate-named-specifier", () => {
  it("single specifier without from import", () => {
    const input = `import { calculateSum } from "utils";`;
    const expectedOuput = `import { calculateSum } from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        specifier: "calculateSum",
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("multiple specifiers without from import", () => {
    const input = `import { calculateSum, calculateSubtract } from "utils";`;
    const expectedOuput = `import { calculateSum } from "lib";
import { calculateSubtract } from "utils";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        specifier: "calculateSum",
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("multiple specifier with from import", () => {
    const input = `
import { calculateSum } from "utils"
import { calculateSubtract } from "lib";
`;
    const expectedOuput = `
import { calculateSubtract, calculateSum } from "lib";
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        specifier: "calculateSum",
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative import", () => {
    const input = `import { calculateSum, calculateSubtract } from "../test/utils.ts";`;
    const expectedOuput = `import { calculateSum } from "../lib.ts";
import { calculateSubtract } from "../test/utils.ts";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "relative",
        specifier: "calculateSum",
        fromSource: path.join(process.cwd(), "../test/utils.ts"),
        toSource: path.join(process.cwd(), "../lib.ts"),
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
});
