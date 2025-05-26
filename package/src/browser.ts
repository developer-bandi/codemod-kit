import { optionsSchemaJsonSchema as addPropsOptionsSchemaJsonSchema } from "./transformers/add-props/optionsSchema";
import { optionsSchemaJsonSchema as changePropsNameOptionsSchemaJsonSchema } from "./transformers/change-props-name/optionsSchema";
import { optionsSchemaJsonSchema as changePropsValueOptionsSchemaJsonSchema } from "./transformers/change-props-value/optionsSchema";
import { optionsSchemaJsonSchema as removePropsOptionsSchemaJsonSchema } from "./transformers/remove-props/optionsSchema";
import { optionsSchemaJsonSchema as changeNamedSpecifierOptionsSchemaJsonSchema } from "./transformers/change-named-specifier/optionsSchema";
import { optionsSchemaJsonSchema as changeSourceOptionsSchemaJsonSchema } from "./transformers/change-source/optionsSchema";
import { optionsSchemaJsonSchema as removeImportOptionsSchemaJsonSchema } from "./transformers/remove-import/optionsSchema";
import { optionsSchemaJsonSchema as seperateNamedSpecifierOptionsSchemaJsonSchema } from "./transformers/seperate-named-specfier/optionsSchema";
import { optionsSchemaJsonSchema as changeParameterObjectOptionsSchemaJsonSchema } from "./transformers/change-parameter-object/optionsSchema";
import addPropsTransformer from "./transformers/add-props/transformer";
import changePropsNameTransformer from "./transformers/change-props-name/transformer";
import changePropsValueTransformer from "./transformers/change-props-value/transformer";
import removePropsTransformer from "./transformers/remove-props/transformer";
import changeNamedSpecifierTransformer from "./transformers/change-named-specifier/transformer";
import changeSourceTransformer from "./transformers/change-source/transformer";
import removeImportTransformer from "./transformers/remove-import/transformer";
import seperateNamedSpecifierTransformer from "./transformers/seperate-named-specfier/transformer";
import changeParameterObjectTransformer from "./transformers/change-parameter-object/transformer";

export const transformMap = {
  "add-props": addPropsTransformer,
  "change-props-name": changePropsNameTransformer,
  "change-props-value": changePropsValueTransformer,
  "remove-props": removePropsTransformer,
  "change-named-specifier": changeNamedSpecifierTransformer,
  "change-source": changeSourceTransformer,
  "remove-import": removeImportTransformer,
  "seperate-named-specifier": seperateNamedSpecifierTransformer,
  "change-parameter-object": changeParameterObjectTransformer,
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
  "change-parameter-object": changeParameterObjectOptionsSchemaJsonSchema,
};
