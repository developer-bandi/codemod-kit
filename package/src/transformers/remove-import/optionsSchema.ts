import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    source: z.string().describe("remove target source"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "remove target source's type. you can choose absolute or relative"
      ),
  })
  .describe("remove import");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
