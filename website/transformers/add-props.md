---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Add Props

Change the specifier of the import module and the identifier that uses it. but local variable is not converted. only convert global value

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { App } from "foo";

const result = <App
    title="hello"
    description="this is dashboard page"
  />`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { App } from "foo";

const result = <App title="hello" description="this is dashboard page" author={"John"} />`}

</CodeBlock>
  </TabItem>
</Tabs>

## Options

```typescript
type Options = {
  componentSourceType?: "absolute" | "relative";
  componentNameType?: "default" | "named";
  componentSource: string;
  componentName: string;
  propsName: string;
  propsValue: string | number | boolean;
};
```

- componentSourceType: componentSource's type. you can choose absolute or relative
- componentNameType: changed target specifier
- componentSource: component source. you can choose package name or target path
- componentName: props to add's component name
- propsName: add props's name
- propsValue: "add props's value. you can choose string, number, boolean

## Usage

The usage method differs depending on the source type of the import statement to be converted.

### absolute

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  componentSourceType: "absolute",
  componentNameType: "named",
  componentSource: "foo",
  componentName: "App",
  propsName: "author",
  propsValue: "John",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { App } from "foo";

const result = <App
    title="hello"
    description="this is dashboard page"
  />`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { App } from "foo";

const result = <App
title="hello"
description="this is dashboard page"
author={"John"}
/>`}

</CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  componentSourceType: "relative",
  componentNameType: "named",
  componentSource: path.join(process.cwd(), "../test/foo.ts"),
  componentName: "App",
  propsName: "author",
  propsValue: "John",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { App } from "../test/foo.ts";

const result = <App
    title="hello"
    description="this is dashboard page"
  />`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { App } from "../test/foo.ts";

const result = <App title="hello" description="this is dashboard page" author={"John"} />`}

</CodeBlock>
  </TabItem>
</Tabs>
