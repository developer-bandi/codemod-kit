import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    fromSource: z.string().describe("Source of the import module to change the source"),
    toSource: z.string().describe("Changed source of the import module"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe("The type of value specified in the source option. You can select a relative or absolute."),
  })
  .describe("Change Import module's source");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
