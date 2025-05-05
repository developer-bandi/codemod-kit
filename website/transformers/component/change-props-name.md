---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Change Props Name

Changes the name of specific props of the selected components.

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
    content="this is dashboard page"
  />
`}
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
  fromPropsName: string;
  toPropsName: string;
};
```

- componentSourceType: change props's name's component source's type. you can choose absolute or relative
- componentNameType: change props's name's component name's type. you can choose default or named
- componentSource: change props's name's component source. you can choose package name or target path
- componentName: change props's name's component name
- fromPropsName: change props's name's from props's name
- toPropsName: change props's name's to props's name

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
  fromPropsName: "description",
  toPropsName: "content",
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
    content="this is dashboard page"
  />`}

</CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  componentNameType: "named",
  componentSource: path.join(process.cwd(), "../test/foo.ts"),
  componentName: "App",
  fromPropsName: "description",
  toPropsName: "content",
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

const result = <App
    title="hello"
    content="this is dashboard page"
  />`}

</CodeBlock>
  </TabItem>
</Tabs>
