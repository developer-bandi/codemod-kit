import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    functionSourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe("function source's type. you can choose absolute or relative"),
    functionNameType: z
      .enum(["default", "named"])
      .optional()
      .describe("function name's type. you can choose default or named"),
    functionSource: z
      .string()
      .describe("function source. you can choose package name or target path"),
    functionName: z.string().describe("function name"),
    objectKeys: z.string().array().describe("function parameter object keys"),
  })
  .describe("remove props");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
