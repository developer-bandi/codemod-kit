import { Editor } from "@monaco-editor/react";
import useStore from "../_store";
import useTypeScriptReactMonaco from "@site/src/hooks/useTypeScriptReactMonaco";
import { useColorMode } from "@docusaurus/theme-common";

const TargetCodeSection = () => {
  const targetCode = useStore((state) => state.targetCode);
  const updateTargetCode = useStore((state) => state.updateTargetCode);
  const { handleEditorDidMount } = useTypeScriptReactMonaco();
  const { colorMode } = useColorMode();

  return (
    <Editor
      height="2000px"
      defaultLanguage="typescript"
      defaultValue={targetCode}
      value={targetCode}
      onChange={(value) => updateTargetCode(value || "")}
      theme={colorMode === "dark" ? "vs-dark" : "vs"}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
};

export default TargetCodeSection;
