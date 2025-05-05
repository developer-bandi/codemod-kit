import { it, expect, describe } from "vitest";
import path from "path";
import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../../utils/getTransformPaths";

describe("add-props", () => {
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
const result = <App title="hello" description="this is dashboard page" author={"John"} />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "author",
        propsValue: "John",
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
const result = <Test title="hello" description="this is dashboard page" author={"John"} />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "author",
        propsValue: "John",
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
const result = <Test title="hello" description="this is dashboard page" author={"John"} />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "default",
        componentSource: "foo",
        componentName: "App",
        propsName: "author",
        propsValue: "John",
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
const result = <Test title="hello" description="this is dashboard page" author={"John"} />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "default",
        componentSource: "foo",
        componentName: "App",
        propsName: "author",
        propsValue: "John",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("namespace named export", () => {
    const input = `import * as Test from "foo";
const result = <Test.App
    title="hello"
    description="this is dashboard page"
  />`;
    const expectedOuput = `import * as Test from "foo";
const result = <Test.App title="hello" description="this is dashboard page" author={"John"} />`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "author",
        propsValue: "John",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("create props with number", () => {
    const input = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is dashboard page"
  />
`;
    const expectedOuput = `
import { App } from "foo";
const result = <App title="hello" description="this is dashboard page" count={1} />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "count",
        propsValue: 1,
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("create props with boolean", () => {
    const input = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is dashboard page"
  />
`;
    const expectedOuput = `
import { App } from "foo";
const result = <App title="hello" description="this is dashboard page" isActive={true} />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "isActive",
        propsValue: true,
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative import", () => {
    const input = `
import { App } from "../test/foo.ts";
const result = <App
    title="hello"
    description="this is dashboard page"
  />
`;
    const expectedOuput = `
import { App } from "../test/foo.ts";
const result = <App title="hello" description="this is dashboard page" author={"John"} />
`;

    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "relative",
        componentNameType: "named",
        componentSource: path.join(process.cwd(), "../test/foo.ts"),
        componentName: "App",
        propsName: "author",
        propsValue: "John",
      },
    });
    const output = transform(...transformParms);
    expect(output).toEqual(expectedOuput);
  });

  it("add props to existing props", () => {
    const input = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is dashboard page"
    author={"John"}
  />
`;
    const expectedOuput = `
import { App } from "foo";
const result = <App
    title="hello"
    description="this is dashboard page"
    author={"John"}
  />
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        componentSourceType: "absolute",
        componentNameType: "named",
        componentSource: "foo",
        componentName: "App",
        propsName: "author",
        propsValue: "John",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
});
