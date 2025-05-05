---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Programmatic

Explains how to run codemod-kit using the programmatic method.

## Installation

install the codemod-kit

<Tabs>
  <TabItem value="npm" label="npm" default>
    <CodeBlock language="bash">npm install --save-dev codemod-kit</CodeBlock>
  </TabItem>
  <TabItem value="yarn" label="yarn">
    <CodeBlock language="bash">yarn add -D codemod-kit</CodeBlock>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    <CodeBlock language="bash">pnpm add -D codemod-kit</CodeBlock>
  </TabItem>
</Tabs>

## Usage

<CodeBlock language="ts">
{`type TransformMap = Record<
    string,
    (
      toConvertPaths: string | string[],
      customOptions: Option,
      jscodeshiftOptions?: { parser: string }
    ) => void
  >;
`}  
</CodeBlock>

Select the type to use in transformMap imported from codemod-kit/programmatic, and then run the function with appropriate options. The options are as follows:

### toConvertPaths

Enter the file to be converted as a string or array.

### customOptions

These are the options required by the selected type of transformer. Please refer to each transformer document for the options required by type.

### jscodeshiftOptions

Options provided by jscodeshift. The currently allowed option is parser and the default is tsx.

## Example

Let's say we want to perform a transformation like the example below.

<Tabs>
<TabItem value="before" label="before" default>
<CodeBlock language="ts">
{`import { sum } from "utils"

console.log(sum(2,1))`}

</CodeBlock>
  </TabItem>
  <TabItem value="after" label="after">
    <CodeBlock language="ts">
      {`import { calculateSum } from "utils"

console.log(calculateSum(2,1))`}

</CodeBlock>
  </TabItem>
</Tabs>

You can convert the code by excute below code

<CodeBlock language="ts">
{`import { transformMap } from "codemod-kit/programmatic"

    transformMap['add-props']({
        toConvertPaths:"src/test.ts"
        customOptions:{
            source: "utils",
            sourceType: "absolute",
            fromSpecifier: "sum",
            toSpecifier: "calculateSum",
        },
        jscodeshiftOptions:{
            parser:"tsx"
        }
    })

`}  
</CodeBlock>
