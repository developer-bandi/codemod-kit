---
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Remove Props

Removes selected props from the target component.

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

const result = <App title="hello" />`}

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
};
```

- componentSourceType: remove props's component source's type. you can choose absolute or relative
- componentNameType: remove props's component name's type. you can choose default or named
- componentSource: remove props's component source. you can choose package name or target path
- componentName:remove props's component name
- propsName: remove props's name

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
  propsName: "description",
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

const result = <App title="hello" />`}

</CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  componentSourceType: "relative",
  componentNameType: "named",
  componentSource: path.join(process.cwd(), "test/foo.ts"),
  componentName: "App",
  propsName: "description",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { App } from "./test/foo.ts";

const result = <App
        title="hello"
        description="asdf"
      />`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { App } from "./test/foo.ts";
const result = <App title="hello" />`}
</CodeBlock>
  </TabItem>
</Tabs>
