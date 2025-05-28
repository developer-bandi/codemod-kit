import { create } from "zustand";
import { optionJsonSchemaMap } from "codemod-kit/browser";
import { querystring } from "zustand-querystring";
import getTransformedCode from "./_utils/getTransformedCode";
import writeQueryParam from "./_utils/writeQueryParam";
import readQueryParam from "./_utils/readQueryParam";

interface State {
  transformerCategory: string;
  transformerOption: object;
  targetCode: string;
  resultCode: { type: string; result: string };
}

interface Actions {
  updateTransformerCategory: (category: string) => void;
  updateTransformerOption: (option: object) => void;
  updateTargetCode: (code: string) => void;
  updateResultCode: (code: { type: string; result: string }) => void;
  reset: () => void;
}

interface Store extends State, Actions {}

const initialValues = {
  transformerCategory: Object.keys(optionJsonSchemaMap)[0],
  transformerOption: {},
  targetCode: "",
  resultCode: { type: "success", result: "" },
};

const useStore = create<Store>()(
  querystring(
    (set, get) => ({
      ...initialValues,
      updateTransformerCategory: (category) =>
        set(() => ({
          transformerCategory: category,
          transformerOption: {},
          resultCode: { type: "success", result: "" },
        })),
      updateTransformerOption: (option) =>
        set(() => ({
          transformerOption: option,
          resultCode: getTransformedCode({
            code: get().targetCode,
            transformerCategory: get().transformerCategory,
            transformerOption: option,
          }),
        })),
      updateTargetCode: (code) =>
        set(() => ({
          targetCode: code,
          resultCode: getTransformedCode({
            code,
            transformerCategory: get().transformerCategory,
            transformerOption: get().transformerOption,
          }),
        })),
      updateResultCode: (code) => set(() => ({ resultCode: code })),
      reset: () =>
        set(() => ({
          ...initialValues,
        })),
    }),
    {
      key: "state",
      select() {
        return {
          transformerCategory: true,
          transformerOption: true,
          targetCode: true,
        };
      },
      format: {
        stringify: writeQueryParam<Store>,
        parse: readQueryParam<Store>,
      },
    }
  )
);

export default useStore;
