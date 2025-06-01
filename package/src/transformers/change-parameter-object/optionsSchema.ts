import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    functionSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe("The type of value specified in the functionSource option. You can select a relative or absolute."),
    functionNameType: z
      .enum(["default", "named"])
      .optional()
      .describe("The type of value specified in the functionName option. You can select a default or named."),
    functionSource: z
      .string()
      .describe("Import module source of the function to which you want to change the parameter to object"),
    functionName: z.string().describe("Import module name of the function to which you want to change the parameter to object"),
    objectKeys: z.string().array().describe("Function parameter object keys"),
  })
  .describe("Change function parameter to object");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
