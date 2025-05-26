---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Change Source

Change the source of the import module

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import Utils from "utils"`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import Utils from "lib"`}

</CodeBlock>
  </TabItem>
</Tabs>

## Options

```typescript
type Options = {
  fromSource: string;
  toSource: string;
  sourceType?: "relative" | "absolute";
};
```

- fromSource: change target specifier
- toSource: changed target specifier
- sourceType: change target source's type. you can choose absolute or relative

## Usage

The usage method differs depending on the source type of the import statement to be converted.

### absolute

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  sourceType: "absolute",
  fromSource: "utils",
  toSource: "lib",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import Utils from "utils"`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import Utils from "lib"`}
    </CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  sourceType: "relative",
  fromSource: path.join(process.cwd(), "test/utils.ts"),
  toSource: path.join(process.cwd(), "test/lib.ts"),
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import Utils from "./test/utils.ts"`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import Utils from "./test/lib.ts"`}
    </CodeBlock>
  </TabItem>
</Tabs>
