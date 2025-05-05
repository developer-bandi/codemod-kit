import { optionsSchemaJsonSchema as addPropsOptionsSchemaJsonSchema } from "./transformers/component/add-props/optionsSchema";
import { optionsSchemaJsonSchema as changePropsNameOptionsSchemaJsonSchema } from "./transformers/component/change-props-name/optionsSchema";
import { optionsSchemaJsonSchema as changePropsValueOptionsSchemaJsonSchema } from "./transformers/component/change-props-value/optionsSchema";
import { optionsSchemaJsonSchema as removePropsOptionsSchemaJsonSchema } from "./transformers/component/remove-props/optionsSchema";
import { optionsSchemaJsonSchema as changeNamedSpecifierOptionsSchemaJsonSchema } from "./transformers/import/change-named-specifier/optionsSchema";
import { optionsSchemaJsonSchema as changeSourceOptionsSchemaJsonSchema } from "./transformers/import/change-source/optionsSchema";
import { optionsSchemaJsonSchema as removeImportOptionsSchemaJsonSchema } from "./transformers/import/remove-import/optionsSchema";
import { optionsSchemaJsonSchema as seperateNamedSpecifierOptionsSchemaJsonSchema } from "./transformers/import/seperate-named-specfier/optionsSchema";
import addPropsTransformer from "./transformers/component/add-props/transformer";
import changePropsNameTransformer from "./transformers/component/change-props-name/transformer";
import changePropsValueTransformer from "./transformers/component/change-props-value/transformer";
import removePropsTransformer from "./transformers/component/remove-props/transformer";
import changeNamedSpecifierTransformer from "./transformers/import/change-named-specifier/transformer";
import changeSourceTransformer from "./transformers/import/change-source/transformer";
import removeImportTransformer from "./transformers/import/remove-import/transformer";
import seperateNamedSpecifierTransformer from "./transformers/import/seperate-named-specfier/transformer";

export const transformMap = {
  "add-props": addPropsTransformer,
  "change-props-name": changePropsNameTransformer,
  "change-props-value": changePropsValueTransformer,
  "remove-props": removePropsTransformer,
  "change-named-specifier": changeNamedSpecifierTransformer,
  "change-source": changeSourceTransformer,
  "remove-import": removeImportTransformer,
  "seperate-named-specifier": seperateNamedSpecifierTransformer,
};

export const optionJsonSchemaMap = {
  "add-props": addPropsOptionsSchemaJsonSchema,
  "change-props-name": changePropsNameOptionsSchemaJsonSchema,
  "change-props-value": changePropsValueOptionsSchemaJsonSchema,
  "remove-props": removePropsOptionsSchemaJsonSchema,
  "change-named-specifier": changeNamedSpecifierOptionsSchemaJsonSchema,
  "change-source": changeSourceOptionsSchemaJsonSchema,
  "remove-import": removeImportOptionsSchemaJsonSchema,
  "seperate-named-specifier": seperateNamedSpecifierOptionsSchemaJsonSchema,
};
