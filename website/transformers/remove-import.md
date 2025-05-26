---
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Remove Import

Remove the import module(not include specifier)

:::info
This rule does not remove cases that contain specifiers.

The reason is that when a specifier is included, the identifiers that use it must also be removed, and we cannot currently cover all the exception cases that occur when removing identifiers.
:::

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import "utils";
import "lib";`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import "lib"`}
    </CodeBlock>
  </TabItem>
</Tabs>

## Options

```typescript
type Options = {
  source: string;
  sourceType?: "relative" | "absolute";
};
```

- source: remove target source
- sourceType: remove target source's type. you can choose absolute or relative

## Usage

The usage method differs depending on the source type of the import statement to be converted.

### absolute

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  source: "utils",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import "utils";`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {``}
    </CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  source: path.join(process.cwd(), "test/utils.ts"),
  sourceType: "relative",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import "./test/utils.ts";`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {``}
    </CodeBlock>
  </TabItem>
</Tabs>
