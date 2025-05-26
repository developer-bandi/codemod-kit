import { Monaco } from "@monaco-editor/react";

import { OnMount } from "@monaco-editor/react";
import { useRef } from "react";

const useTypeScriptReactMonaco = () => {
  const monacoRef = useRef<Monaco | null>(null);

  // Monaco 에디터가 로드될 때 언어 설정을 구성합니다
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;

    // TypeScript 컴파일러 옵션 설정
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: "React.createElement",
      reactNamespace: "React",
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });
  };

  return { handleEditorDidMount, monacoRef };
};

export default useTypeScriptReactMonaco;
