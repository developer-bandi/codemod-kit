import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    componentSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe("The type of value specified in the componentSource option. You can select a relative or absolute."),
    componentNameType: z
      .enum(["default", "named"])
      .optional()
      .describe("The type of value specified in the componentName option. You can select a default or named."),
    componentSource: z  
      .string()
      .describe("Import module source of the component to which you want to remove props"),
    componentName: z.string().describe("Import module name of the component to which you want to remove props"),
    propsName: z.string().describe("Remove props's name"),
  })
  .describe("Remove target component's props");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
