import { it, expect, describe } from "vitest";
import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../utils/test/getTransformPaths";
import path from "path";

describe("change-parameter-object", () => {
  it("named export", () => {
    const input = `
import { dummyFunction } from "foo";
dummyFunction("hello", "this is dashboard page");
`;
    const expectedOuput = `
import { dummyFunction } from "foo";
dummyFunction({
  "title": "hello",
  "description": "this is dashboard page"
});
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "absolute",
        functionNameType: "named",
        functionSource: "foo",
        functionName: "dummyFunction",
        objectKeys: ["title", "description"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
  it("nameSpace export", () => {
    const input = `
import { dummyFunction as Test } from "foo";
Test("hello", "this is dashboard page");
`;
    const expectedOuput = `
import { dummyFunction as Test } from "foo";
Test({
  "title": "hello",
  "description": "this is dashboard page"
});
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "absolute",
        functionNameType: "named",
        functionSource: "foo",
        functionName: "dummyFunction",
        objectKeys: ["title", "description"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
  it("default export", () => {
    const input = `
import dummyFunction from "foo";
dummyFunction("hello", "this is dashboard page");
`;
    const expectedOuput = `
import dummyFunction from "foo";
dummyFunction({
  "title": "hello",
  "description": "this is dashboard page"
});
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "absolute",
        functionNameType: "default",
        functionSource: "foo",
        functionName: "dummyFunction",
        objectKeys: ["title", "description"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
  it("namespace default export", () => {
    const input = `
import * as Test from "foo";
Test("hello", "this is dashboard page");
`;
    const expectedOuput = `
import * as Test from "foo";
Test({
  "title": "hello",
  "description": "this is dashboard page"
});
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "absolute",
        functionNameType: "default",
        functionSource: "foo",
        functionName: "dummyFunction",
        objectKeys: ["title", "description"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace named export", () => {
    const input = `
import * as Test from "foo";
Test.dummyFunction("hello", "this is dashboard page");
`;
    const expectedOuput = `
import * as Test from "foo";
Test.dummyFunction({
  "title": "hello",
  "description": "this is dashboard page"
});
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "absolute",
        functionNameType: "named",
        functionSource: "foo",
        functionName: "dummyFunction",
        objectKeys: ["title", "description"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative import", () => {
    const input = `
import * as Test from "../test/foo.ts";
Test.dummyFunction("hello", "this is dashboard page");
`;
    const expectedOuput = `
import * as Test from "../test/foo.ts";
Test.dummyFunction({
  "title": "hello",
  "description": "this is dashboard page"
});
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "relative",
        functionNameType: "named",
        functionSource: path.join(process.cwd(), "../test/foo.ts"),
        functionName: "dummyFunction",
        objectKeys: ["title", "description"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("single parameter", () => {
    const input = `
    import { dummyFunction } from "foo";
    dummyFunction("hello");
    `;

    const expectedOuput = `
    import { dummyFunction } from "foo";
    dummyFunction({ "title": "hello" });
    `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        functionSourceType: "absolute",
        functionNameType: "named",
        functionSource: "foo",
        functionName: "dummyFunction",
        objectKeys: ["title"],
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
});
