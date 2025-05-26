import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    componentSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "change props's value's component source's type. you can choose absolute or relative"
      ),
    componentNameType: z
      .enum(["default", "named"])
      .optional()
      .describe(
        "change props's value's component name's type. you can choose default or named"
      ),
    componentSource: z
      .string()
      .describe(
        "change props's value's component source. you can choose package name or target path"
      ),
    componentName: z.string().describe("change props's value's component name"),
    propsName: z.string().describe("change props's value's props's name"),
    propsValue: z
      .union([z.string(), z.number(), z.boolean()])
      .describe(
        "change props's value's value. you can choose string, number, boolean"
      ),
  })
  .describe("change props's value");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
