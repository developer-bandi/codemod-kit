import type { JSCodeshift,Collection } from "jscodeshift";

export interface getConvertedIdentifierNameParams  {
  root: Collection;
  jscodeshift: JSCodeshift;
  source: string;
  nameType: "default" | "named";
  name: string;
}

function getConvertedImportIdentifierName({
    root,
    jscodeshift,
    source,
    nameType,
    name,
}: getConvertedIdentifierNameParams) {
    let convertedName: null | string = null;

    root
      .find(jscodeshift.ImportDeclaration)
      .filter((node) => node.value.source.value === source)
      .forEach((node) => {
        node.value.specifiers?.forEach((specifier) => {
          if (
            specifier.type === "ImportDefaultSpecifier" &&
            nameType === "default"
          ) {
            return (convertedName =
              specifier.local?.type === "Identifier"
                ? specifier.local.name
                : name);
          }
  
          if (
            specifier.type === "ImportSpecifier" &&
            nameType === "named" &&
            specifier.imported.type === "Identifier" &&
            specifier.imported.name === name
          ) {
            return (convertedName =
              specifier.local?.type === "Identifier"
                ? specifier.local.name
                : name);
          }
  
          if (
            specifier.type === "ImportNamespaceSpecifier" &&
            nameType === "default"
          ) {
            return (convertedName =
              specifier.local?.type === "Identifier"
                ? specifier.local.name
                : name);
          }
  
          if (
            specifier.type === "ImportNamespaceSpecifier" &&
            nameType === "named"
          ) {
            return (convertedName = name);
          }
        });
      });

      return convertedName;
}

export default getConvertedImportIdentifierName;
