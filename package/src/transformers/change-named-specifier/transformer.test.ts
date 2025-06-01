import { it, expect, describe } from "vitest";
import path from "path";
import transform from "./transformer";
import { OptionsSchema } from "./optionsSchema";
import getTransformParms from "../../utils/test/getTransformPaths";

describe("change-named-specifier", () => {
  it("single specifier import", () => {
    const input = `
import { sum } from "utils"
console.log(sum(2,1))
`;
    const expectedOuput = `
import { calculateSum } from "utils"
console.log(calculateSum(2,1))
`;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
        sourceType: "absolute",
        fromSpecifier: "sum",
        toSpecifier: "calculateSum",
      } as const,
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("multiple specifier import", () => {
    const input = `
  import { sum, calculateSubtract } from "utils"
  console.log(sum(2,1))
  console.log(calculateSubtract(2,1))
  `;
    const expectedOuput = `
  import { calculateSum, calculateSubtract } from "utils"
  console.log(calculateSum(2,1))
  console.log(calculateSubtract(2,1))
  `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
        sourceType: "absolute",
        fromSpecifier: "sum",
        toSpecifier: "calculateSum",
      } as const,
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("not change local scope identifier", () => {
    const input = `
  import { sum } from "utils"
  console.log(sum(2,1))

  const testFn = () => {
    const sum = (a,b,c) => { return a + b + c }
    console.log(sum(2,1,0))
  }
  `;
    const expectedOuput = `
  import { calculateSum } from "utils"
  console.log(calculateSum(2,1))

  const testFn = () => {
    const sum = (a,b,c) => { return a + b + c }
    console.log(sum(2,1,0))
  }
  `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
        sourceType: "absolute",
        fromSpecifier: "sum",
        toSpecifier: "calculateSum",
      } as const,
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("not change memberExpression and optionalMemberExpression", () => {
    const input = `
  import Utils from "utils"
  console.log(Utils.sum(2,1))
  console.log(Utils?.sum(2,1))
  `;
    const expectedOuput = `
  import Utils from "utils"
  console.log(Utils.sum(2,1))
  console.log(Utils?.sum(2,1))
  `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
        sourceType: "absolute",
        fromSpecifier: "sum",
        toSpecifier: "calculateSum",
      } as const,
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("packageName with path", () => {
    const input = `import { getName } from "foo/bar"
  console.log(getName())
      `;
    const expectedOuput = `import { getAge } from "foo/bar"
  console.log(getAge())
      `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "foo/bar",
        sourceType: "absolute",
        fromSpecifier: "getName",
        toSpecifier: "getAge",
      } as const,
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("sourceType option has 'absolute' as default value", () => {
    const input = `
  import { sum } from "utils"
  console.log(sum(2,1))
  `;
    const expectedOuput = `
  import { calculateSum } from "utils"
  console.log(calculateSum(2,1))
  `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: "utils",
        sourceType: "absolute",
        fromSpecifier: "sum",
        toSpecifier: "calculateSum",
      } as const,
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });

  it("relative source path", () => {
    const input = `
  import { sum } from  "./utils.ts"
  console.log(sum())
      `;
    const expectedOuput = `
  import { calculateSum } from  "./utils.ts"
  console.log(calculateSum())
      `;
    const transformParms = getTransformParms<OptionsSchema>({
      input,
      options: {
        source: path.join(process.cwd(), "./utils.ts"),
        sourceType: "relative",
        fromSpecifier: "sum",
        toSpecifier: "calculateSum",
      },
    });
    const output = transform(...transformParms);

    expect(output).toEqual(expectedOuput);
  });
});
