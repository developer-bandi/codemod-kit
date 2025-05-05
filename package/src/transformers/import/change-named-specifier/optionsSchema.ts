import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    fromSpecifier: z.string().describe("change target specifier"),
    toSpecifier: z.string().describe("changed target specifier"),
    source: z.string().describe("change target source"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "change target source's type. you can choose absolute or relative"
      ),
  })
  .describe("change named specifier");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
