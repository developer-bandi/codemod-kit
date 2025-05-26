import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    componentSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe("componentSource's type. you can choose absolute or relative"),
    componentNameType: z
      .enum(["default", "named"])
      .optional()
      .describe("component name's type. you can choose default or named"),
    componentSource: z
      .string()
      .describe("component source. you can choose package name or target path"),
    componentName: z.string().describe("props to add's component name"),
    propsName: z.string().describe("add props's name"),
    propsValue: z
      .union([z.string(), z.number(), z.boolean()])
      .describe("add props's value. you can choose string, number, boolean"),
  })
  .describe("add props's name and value");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
