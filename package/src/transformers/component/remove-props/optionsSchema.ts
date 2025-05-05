import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    componentSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "remove props's component source's type. you can choose absolute or relative"
      ),
    componentNameType: z
      .enum(["default", "named"])
      .optional()
      .describe(
        "remove props's component name's type. you can choose default or named"
      ),
    componentSource: z
      .string()
      .describe(
        "remove props's component source. you can choose package name or target path"
      ),
    componentName: z.string().describe("remove props's component name"),
    propsName: z.string().describe("remove props's name"),
  })
  .describe("remove props");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
