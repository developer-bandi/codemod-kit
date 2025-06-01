import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    specifier: z.string().describe("Seperate target import module's named specifier's specifiers"),
    fromSource: z.string().describe("Seperate target import module's named specifier's source"),
    toSource: z.string().describe("Seperate target import module's named specifier's target source"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe("The type of value specified in the source option. You can select a relative or absolute."),
  })
  .describe("Seperate target import module's named specifier");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
