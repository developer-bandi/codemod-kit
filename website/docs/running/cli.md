---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Cli

Explains how to run codemod-kit using the cli method.

## Installation

install the codemod-kit

<Tabs>
  <TabItem value="npm" label="npm" default>
    <CodeBlock language="bash">npm install -g codemod-kit</CodeBlock>
  </TabItem>
  <TabItem value="yarn" label="yarn">
    <CodeBlock language="bash">yarn global add codemod-kit</CodeBlock>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    <CodeBlock language="bash">pnpm add -g codemod-kit</CodeBlock>
  </TabItem>
</Tabs>

## Usage

Perform some steps by running the commands below:

<CodeBlock language="ts">npx codemod-kit</CodeBlock>

### type

Select a transformer type from the list

### path

Enter the path to the file or directory to transform split by comma(,). Supports glob patterns.

### parser

Select the parser to use from the list.

### options

Enter the options that match the type in JSON format.

## Example

Let's say we want to perform a transformation like the example below.

<Tabs>
<TabItem value="before" label="before" default>
<CodeBlock language="ts">
{`import { App } from "foo";

const result = <App title="hello" description="this is dashboard page"/>
`}
</CodeBlock>
  </TabItem>
  <TabItem value="after" label="after">
    <CodeBlock language="ts">
{`import { App } from "foo";

const result = <App title="hello" description="this is dashboard page" author={"John"} />
`}
</CodeBlock>
</TabItem>
</Tabs>

You can convert the code by entering the values ​​below in order.

### type

<CodeBlock language="tsx">add-props</CodeBlock>

### path

<CodeBlock language="ts">src/\*_/_.ts,src/foo.ts</CodeBlock>

### parser

<CodeBlock language="ts">tsx</CodeBlock>

### options

<CodeBlock language="json">
{`{
    "componentSourceType": "absolute",
    "componentNameType": "named",
    "componentSource": "foo",
    "componentName": "App",
    "propsName": "author",
    "propsValue": "John"
}`}
</CodeBlock>
