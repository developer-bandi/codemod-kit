import { it, expect, describe } from "vitest";

import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import path from "path";
import getTransformParms from "../../utils/test/getTransformPaths";

describe("change-source", () => {
  it("default exports", () => {
    const input = `import Utils from "utils";`;
    const expectedOuput = `import Utils from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("named exports", () => {
    const input = `import { calculateSum } from "utils";`;
    const expectedOuput = `import { calculateSum } from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("named exports with alias", () => {
    const input = `import { sum as calculateSum } from "utils";`;
    const expectedOuput = `import { sum as calculateSum } from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("default and named exports", () => {
    const input = `import Utils, { calculateSum } from "utils";`;
    const expectedOuput = `import Utils, { calculateSum } from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace imports", () => {
    const input = `import * as Utils from "utils";`;
    const expectedOuput = `import * as Utils from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("default import not use specifier", () => {
    const input = `import "utils";`;
    const expectedOuput = `import "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("dynamic import", () => {
    const input = `const { default: _ } = await import("utils");`;
    const expectedOuput = `const { default: _ } = await import("lib");`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "absolute",
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("type option 'absolute' default value", () => {
    const input = `import Utils from "utils";`;
    const expectedOuput = `import Utils from "lib";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        fromSource: "utils",
        toSource: "lib",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative source path", () => {
    const input = `import Utils from "./test/utils.ts";`;
    const expectedOuput = `import Utils from "./test/lib.ts";`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        sourceType: "relative",
        fromSource: path.join(process.cwd(), "test/utils.ts"),
        toSource: path.join(process.cwd(), "test/lib.ts"),
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
});
