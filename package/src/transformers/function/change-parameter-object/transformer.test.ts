import { it, expect, describe } from "vitest";
import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../../utils/getTransformPaths";

describe("general case", () => {
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
});
