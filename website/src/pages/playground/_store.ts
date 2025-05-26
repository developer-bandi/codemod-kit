import { create } from "zustand";
import { optionJsonSchemaMap } from "codemod-kit/browser";
import getTransformedCode from "./_utils/getTransformedCode";

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
}

const useStore = create<State & Actions>((set, get) => ({
  transformerCategory: Object.keys(optionJsonSchemaMap)[0],
  transformerOption: {},
  targetCode: "",
  resultCode: { type: "success", result: "" },
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
}));

export default useStore;
