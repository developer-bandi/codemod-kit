import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const optionsSchema = z
  .object({
    fromSpecifier: z.string().describe("Specifier name to change"),
    toSpecifier: z.string().describe("Changed specifier name"),
    source: z.string().describe("Source of the import module to change the named specifier"),
    sourceType: z
      .enum(["absolute", "relative"])
      .optional()
      .describe(
        "The type of value specified in the source option. You can select a relative or absolute."
      ),
  })
  .describe("Change named specifier of import module and usecase");

export const optionsSchemaJsonSchema = zodToJsonSchema(optionsSchema);

export type OptionsSchema = z.infer<typeof optionsSchema>;
