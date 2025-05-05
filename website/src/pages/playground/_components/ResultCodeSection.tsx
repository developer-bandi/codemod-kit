import { Editor } from "@monaco-editor/react";
import useStore from "../_store";
import useTypeScriptReactMonaco from "@site/src/hooks/useTypeScriptReactMonaco";
import { useColorMode } from "@docusaurus/theme-common";
const ResultCodeSection = () => {
  const resultCode = useStore((state) => state.resultCode);
  const targetCode = useStore((state) => state.targetCode);
  const transformerOption = useStore((state) => state.transformerOption);

  const { handleEditorDidMount } = useTypeScriptReactMonaco();
  const { colorMode } = useColorMode();

  if (targetCode === "" && Object.keys(transformerOption).length === 0) {
    return null;
  }

  if (resultCode.type === "error") {
    return (
      <div style={{ color: "#FF6B6B", padding: "10px" }}>
        {resultCode.result}
      </div>
    );
  }

  return (
    <Editor
      height="2000px"
      defaultLanguage={"typescript"}
      value={resultCode.result}
      theme={colorMode === "dark" ? "vs-dark" : "vs"}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        readOnly: true,
      }}
    />
  );
};

export default ResultCodeSection;
