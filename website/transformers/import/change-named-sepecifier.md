---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Change Named Specifier

Change the specifier of the import module and the identifier that uses it. but local variable is not converted. only convert global value

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { sum } from "utils"

console.log(sum(2,1))

const testFn = () => {
const sum = (a,b,c) => { return a + b + c }
console.log(sum(2,1,0))
}
`}
</CodeBlock>

  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { calculateSum } from "utils"

console.log(calculateSum(2,1))

const testFn = () => {
const sum = (a,b,c) => { return a + b + c }
console.log(sum(2,1,0))
}`}

</CodeBlock>
  </TabItem>
</Tabs>

## Options

```typescript
type Options = {
  fromSpecifier: string;
  toSpecifier: string;
  source: string;
  sourceType?: "absolute" | "relative";
};
```

- from: change target specifier
- to: changed target specifier
- source: change target source
- sourceType: change target source's type. you can choose absolute or relative

## Usage

The usage method differs depending on the source type of the import statement to be converted.

### absolute

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  source: "utils",
  sourceType: "absolute",
  fromSpecifier: "sum",
  toSpecifier: "calculateSum",
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { sum } from "utils"

console.log(sum(2,1))`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { calculateSum } from "utils"

console.log(calculateSum(2,1))`}

</CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  source: path.join(process.cwd(), "./utils.ts"),
  sourceType: "relative",
  fromSpecifier: "sum",
  toSpecifier: "calculateSum",
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
      {`import { calculateSum } from  "./utils.ts"

console.log(calculateSum())`}

</CodeBlock>
  </TabItem>
</Tabs>
