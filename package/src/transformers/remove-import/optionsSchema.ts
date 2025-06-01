import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    source: z.string().describe("Source of the import module to be removed"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "The type of value specified in the source option. You can select a relative or absolute."
      ),
  })
  .describe("remove import");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
