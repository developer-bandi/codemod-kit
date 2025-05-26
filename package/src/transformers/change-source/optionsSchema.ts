import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    fromSource: z.string().describe("change target source"),
    toSource: z.string().describe("changed target source"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "change target source's type. you can choose absolute or relative"
      ),
  })
  .describe("change source");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
