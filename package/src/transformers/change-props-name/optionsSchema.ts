import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    componentSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "change props's name's component source's type. you can choose absolute or relative"
      ),
    componentNameType: z
      .enum(["default", "named"])
      .optional()
      .describe(
        "change props's name's component name's type. you can choose default or named"
      ),
    componentSource: z
      .string()
      .describe(
        "change props's name's component source. you can choose package name or target path"
      ),
    componentName: z.string().describe("change props's name's component name"),
    fromPropsName: z
      .string()
      .describe("change props's name's from props's name"),
    toPropsName: z.string().describe("change props's name's to props's name"),
  })
  .describe("change props's name");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
