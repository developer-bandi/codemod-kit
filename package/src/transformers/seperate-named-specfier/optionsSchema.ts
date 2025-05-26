import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    specifier: z.string().describe("seperate named specifier's specifiers"),
    fromSource: z.string().describe("seperate named specifier's source"),
    toSource: z.string().describe("seperate named specifier's target source"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "seperate named specifier's source's type. you can choose absolute or relative"
      ),
  })
  .describe("seperate named specifier");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
