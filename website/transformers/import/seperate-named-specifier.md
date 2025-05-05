---
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Seperate Named Specifier

Change the specifier of the import module and the identifier that uses it. but local variable is not converted. only convert global value

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { calculateSum, calculateSubtract } from "utils";`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { calculateSum } from "lib";
import { calculateSubtract } from "utils";`}
    </CodeBlock>
  </TabItem>
</Tabs>

## Options

```typescript
type Options {
  specifiers: string[];
  fromSource: string;
  toSource: string;
  sourceType?: "relative" | "absolute";
}
```

- specifiers: seperate named specifier's specifiers
- fromSource: seperate named specifier's source
- toSource: seperate named specifier's target source
- sourceType: seperate named specifier's source's type. you can choose absolute or relative

## Usage

The usage method differs depending on the source type of the import statement to be converted.

### absolute

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  specifiers: ["calculateSum"],
  sourceType: "absolute",
  fromSource: "utils",
  toSource: "lib",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { calculateSum } from "utils";`}  
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { calculateSum } from "lib";`}  
    </CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  sourceType: "relative",
  specifiers: ["calculateSum"],
  fromSource: path.join(process.cwd(), "../test/utils.ts"),
  toSource: path.join(process.cwd(), "../lib.ts"),
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { sum } from  "./utils.ts"

console.log(sum())`}
    </CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { calculateSum } from "./utils.ts"

console.log(calculateSum())`}
</CodeBlock>
</TabItem>
</Tabs>
