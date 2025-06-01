import { it, expect, describe } from "vitest";
import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../utils/test/getTransformPaths";

describe("change-props-value", () => {
  it("named export", () => {
    const input = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is dashboard page"
  />
`;
    const expectedOuput = `
import { App } from "foo";
const result = <App
    title="hello"
    description={"this is home page"}
  />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("nameSpace export", () => {
    const input = `
import { App as Test } from "foo";
const result = <Test
    title="hello"
    description="this is dashboard page"
  />
`;
    const expectedOuput = `
import { App as Test } from "foo";
const result = <Test
    title="hello"
    description={"this is home page"}
  />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("default export", () => {
    const input = `
import Test from "foo";
const result = <Test
    title="hello"
    description="this is dashboard page"
  />
`;
    const expectedOuput = `
import Test from "foo";
const result = <Test
    title="hello"
    description={"this is home page"}
  />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "default",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace default export", () => {
    const input = `
import * as Test from "foo";
const result = <Test
    title="hello"
    description="asdf"
  />
`;
    const expectedOuput = `
import * as Test from "foo";
const result = <Test
    title="hello"
    description={"this is home page"}
  />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "default",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace named export", () => {
    const input = `
import * as Test from "foo";
const result = <Test.App
    title="hello"
    description="asdf"
  />
`;
    const expectedOuput = `
import * as Test from "foo";
const result = <Test.App
    title="hello"
    description={"this is home page"}
  />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("not match propsName", () => {
    const input = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is home page"
  />
`;
    const expectedOuput = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is home page"
  />
`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "any",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("propsValue number Type", () => {
    const input = `import * as Test from "foo";
const result = <Test.App
    title="hello"
    description="this is dashboard page"
  />`;
    const expectedOuput = `import * as Test from "foo";
const result = <Test.App
    title="hello"
    description={1}
  />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: 1,
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("propsName boolean type", () => {
    const input = `import * as Test from "foo";
const result = <Test.App
    title="hello"
    description="this is dashboard page"
  />`;
    const expectedOuput = `import * as Test from "foo";
const result = <Test.App
    title="hello"
    description={false}
  />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
        propsValue: false,
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative path", () => {
    const input = `import { App } from "./test/foo.ts";
const result = <App
    title="hello"
    description="this is dashboard page"
  />`;
    const expectedOuput = `import { App } from "./test/foo.ts";
const result = <App
    title="hello"
    description={"this is home page"}
  />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "relative",
        componentNameType: "named",
        componentSource: "./test/foo.ts",
        componentName: "App",
        propsName: "description",
        propsValue: "this is home page",
      },
    });
    const output = transform(...transformParms);
    expect(output).toEqual(expectedOuput);
  });
});
