import { it, expect, describe } from "vitest";
import path from "path";
import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../utils/getTransformPaths";

describe("general case", () => {
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
const result = <App title="hello" />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
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
const result = <Test title="hello" />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("default export", () => {
    const input = `import Test from "foo";
const result = <Test
    title="hello"
    description="this is dashboard page"
  />`;
    const expectedOuput = `import Test from "foo";
const result = <Test title="hello" />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "default",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace default export", () => {
    const input = `import * as Test from "foo";
const result = <Test
    title="hello"
    description="this is dashboard page"
  />`;
    const expectedOuput = `import * as Test from "foo";
const result = <Test title="hello" />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "default",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace named export", () => {
    const input = `import * as Test from "foo";
const result = <Test.App
    title="hello"
    description="asdf"
  />`;
    const expectedOuput = `import * as Test from "foo";
const result = <Test.App title="hello" />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "description",
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
    description="asdf"
  />
`;
    const expectedOuput = `
import { App } from "foo";
const result = <App
    title="hello"
    description="asdf"
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
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative path", () => {
    const input = `import { App } from "./test/foo.ts";
const result = <App
        title="hello"
        description="asdf"
      />`;
    const expectedOuput = `import { App } from "./test/foo.ts";
const result = <App title="hello" />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "relative",
        componentNameType: "named",
        componentSource: path.join(process.cwd(), "test/foo.ts"),
        componentName: "App",
        propsName: "description",
      },
    });
    const output = transform(...transformParms);
    expect(output).toEqual(expectedOuput);
  });
});
