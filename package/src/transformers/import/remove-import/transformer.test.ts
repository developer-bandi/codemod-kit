import { it, expect, describe } from "vitest";
import path from "path";

import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../../utils/getTransformPaths";

describe("remove-import", () => {
  it("single import", () => {
    const input = `import "utils";`;
    const expectedOuput = ``;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("multiple imports", () => {
    const input = `import "utils";
import "lib";
`;
    const expectedOuput = `import "lib";
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative imports", () => {
    const input = `import "./test/utils.ts";`;
    const expectedOuput = ``;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: path.join(process.cwd(), "test/utils.ts"),
        sourceType: "relative",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
});
