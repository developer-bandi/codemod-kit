import { optionJsonSchemaMap } from "codemod-kit/browser";
import { useState, useEffect } from "react";
import validator from "@rjsf/validator-ajv8";
import { Select, Input, ConfigProvider, theme, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Form from "@rjsf/antd";

import {
  RJSFSchema,
  UiSchema,
  FieldTemplateProps,
  WidgetProps,
  ArrayFieldTemplateProps,
  ArrayFieldTemplateItemType,
} from "@rjsf/utils";
import useStore from "../_store";
import { useColorMode } from "@docusaurus/theme-common";

const CustomFieldTemplate = (props: FieldTemplateProps) => {
  const { label, required, errors, children } = props;

  return (
    <div className="custom-field" style={{ marginBottom: "10px" }}>
      <div
        className="custom-field-label"
        style={{ fontWeight: "bold", marginBottom: "5px" }}
      >
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </div>
      <div className="custom-field-input">{children}</div>
      {errors && (
        <div
          className="custom-field-error"
          style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
        >
          {errors}
        </div>
      )}
    </div>
  );
};

const CustomTitleField = () => {
  return null;
};

const CustomDescriptionField = () => {
  return null;
};

const CustomArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, canAdd, onAddClick } = props;

  return (
    <div className="array-field-container" style={{ marginBottom: "16px" }}>
      <div className="array-items">
        {items.map((element: ArrayFieldTemplateItemType) => (
          <div key={element.key} className="array-item-row" style={{ marginBottom: "4px", display: "flex", alignItems: "center" }}>
            <div className="array-item-content" style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 'normal', color: '#666', marginBottom: '2px' }}>
                option{element.index + 1}
              </div>
              {element.children}
            </div>
            <Button 
              danger 
              type="text" 
              onClick={element.onDropIndexClick(element.index)}
              size="small"
              style={{ marginLeft: "8px", flexShrink: 0 }}
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
      </div>
      {canAdd && (
        <Button 
          type="dashed" 
          onClick={onAddClick} 
          style={{ marginTop: "8px", width: "100%" }}
        >
          + Add Option
        </Button>
      )}
    </div>
  );
};

interface EnumOption {
  label: string;
  value: string | number | boolean;
}

const CustomWidgets = {
  TextWidget: (props: WidgetProps) => {
    const { id, value, required, disabled, onChange, schema } = props;

    return (
      <div className="dark">
        <Input
          id={id}
          value={value || ""}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={schema.description}
          className="custom-dark-input"
        />
      </div>
    );
  },

  SelectWidget: (props: WidgetProps) => {
    const { id, value, disabled, onChange, options, schema } = props;

    const enumOptions = (options.enumOptions || []) as EnumOption[];

    return (
      <Select
        id={id}
        value={value}
        disabled={disabled}
        style={{ width: "100%" }}
        onChange={(selectedValue) => onChange(selectedValue)}
        placeholder={schema.description}
      >
        {enumOptions.map((option) => (
          <Select.Option key={option.value.toString()} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};

const CustomSubmitButton = () => {
  return null;
};

interface FieldUiSchema {
  "ui:description": string;
  "ui:help"?: string;
  "ui:widget"?: string;
  "ui:options"?: {
    placeholder?: string;
    [key: string]: unknown;
  };
}

const OptionSection = () => {
  const [currentSchema, setCurrentSchema] = useState<RJSFSchema | null>(null);
  const [customUiSchema, setCustomUiSchema] = useState<UiSchema>({});
  const updateTransformerCategory = useStore(
    (state) => state.updateTransformerCategory
  );
  const updateTransformerOption = useStore(
    (state) => state.updateTransformerOption
  );
  const transformerCategory = useStore((state) => state.transformerCategory);
  const transformerOption = useStore((state) => state.transformerOption);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const schema = optionJsonSchemaMap[transformerCategory] as RJSFSchema;
    setCurrentSchema(schema);

    if (schema && typeof schema === 'object' && 'properties' in schema && schema.properties) {
      const newUiSchema: UiSchema = {
        "ui:submitButtonOptions": {
          submitText: "apply options",
        },
        "ui:options": {
          label: false,
        },
        "ui:description": "",
        "ui:title": "",
      };

      Object.entries(schema.properties).forEach(([key, prop]) => {
        if (typeof prop === "object") {
          const fieldUiSchema: FieldUiSchema = {
            "ui:description": "",
          };

          if (prop.description) {
            fieldUiSchema["ui:help"] = prop.description;
          }

          if (prop.enum && Array.isArray(prop.enum)) {
            fieldUiSchema["ui:widget"] = "SelectWidget";
            if (!transformerOption || transformerOption[key] === undefined) {
              fieldUiSchema["ui:options"] = {
                placeholder: "select option",
              };
            }
          }

          // Add special handling for array items
          if (typeof prop === "object" && prop.type === "array" && prop.items) {
            // If the array items are objects, mark them as nested
            if (typeof prop.items === "object" && prop.items && 'type' in prop.items && prop.items.type === "object") {
              fieldUiSchema["ui:options"] = {
                ...(fieldUiSchema["ui:options"] || {}),
                addButtonLabel: "항목 추가",
              };
              
              // Add UI schema for the items
              fieldUiSchema["items"] = {
                "ui:options": {
                  nested: true,
                }
              };
            }
          }

          newUiSchema[key] = fieldUiSchema;
        } else {
          newUiSchema[key] = {
            "ui:description": "",
          };
        }
      });

      setCustomUiSchema(newUiSchema);
    }
  }, [transformerCategory, transformerOption]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          colorMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{ padding: 10 }}>
        <Select
          value={transformerCategory}
          size="large"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(value) => {
            updateTransformerCategory(value);
          }}
          options={Object.entries(optionJsonSchemaMap).map(([key, value]) => ({
            value: key,
            label: (
              <div>
                <div style={{ fontSize: 14 }}>{key}</div>
                <div style={{ fontSize: 12 }}>
                  {value.description ?? "설명이 없습니다"}
                </div>
              </div>
            ),
          }))}
          labelRender={({ value }) => {
            return <span>{value}</span>;
          }}
        />
        <div
          style={{
            padding: "15px",
            backgroundColor: colorMode === "dark" ? "#141414" : "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <style>
            {`
            .ant-form-item {
              margin-bottom: 16px;
            }
            .ant-form-item-label > label {
              font-weight: bold;
            }
            .ant-form {
              border: none !important;
            }
            .ant-form:before, .ant-form:after {
              display: none !important;
            }
            fieldset {
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .ant-form-item-extra {
              display: none !important;
            }
            .ant-select-item-option-content {
              font-size: 14px;
            }
            .array-item-row .ant-form-item {
              margin-bottom: 0;
            }
            .array-item-row .custom-field {
              margin-bottom: 0;
              padding: 2px 0;
            }
            .array-item-row .custom-field-label {
              display:none;
            }
            .array-item-row .ant-form-item-label > label {
              display: none;
            }
            .object-field-properties {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }
          `}
          </style>
          {currentSchema && (
            <Form
              schema={currentSchema}
              formData={transformerOption}
              onChange={(e) => { updateTransformerOption(e.formData);
              }}
              validator={validator}
              uiSchema={customUiSchema}
              templates={{
                FieldTemplate: CustomFieldTemplate,
                TitleFieldTemplate: CustomTitleField,
                DescriptionFieldTemplate: CustomDescriptionField,
                ArrayFieldTemplate: CustomArrayFieldTemplate,
                ButtonTemplates: {
                  SubmitButton: CustomSubmitButton,
                },
              }}
              widgets={CustomWidgets}
              className="custom-rjsf-form"
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default OptionSection;
