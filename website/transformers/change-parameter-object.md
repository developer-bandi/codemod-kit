---
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

# Change Parameter Object

Modify the function argument to take an object.

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { dummyFunction } from "foo";
dummyFunction("hello", "this is dashboard page");`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { dummyFunction } from "foo";

dummyFunction({
"title": "hello",
"description": "this is dashboard page"
});`}

</CodeBlock>
  </TabItem>
</Tabs>

## Options

```typescript
type Options = {
  functionSourceType?: "absolute" | "relative";
  functionNameType?: "default" | "named";
  functionSource: string;
  functionName: string;
  objectKeys: string[];
};
```

- functionSourceType: componentSource's type. you can choose absolute or relative
- functionNameType: changed target specifier
- functionSource: component source. you can choose package name or target path
- functionName: props to add's component name
- objectKeys: add props's name

## Usage

The usage method differs depending on the source type of the import statement to be converted.

### absolute

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  functionSourceType: "absolute",
  functionNameType: "named",
  functionSource: "foo",
  functionName: "dummyFunction",
  objectKeys: ["title", "description"],
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { dummyFunction } from "foo";
dummyFunction("hello", "this is dashboard page");`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { dummyFunction } from "foo";

dummyFunction({
"title": "hello",
"description": "this is dashboard page"
});`}

</CodeBlock>
  </TabItem>
</Tabs>

### relative

This is a situation where the source of the import module you want to change is an absolute path.

```typescript title="option.ts"
const option = {
  functionSourceType: "relative",
  functionNameType: "named",
  functionSource: path.join(process.cwd(), "../test/foo.ts"),,
  functionName: "dummyFunction",
  objectKeys: ["title", "description"],
};
```

<Tabs>
  <TabItem value="js" label="before" default>
    <CodeBlock language="ts">
      {`import { dummyFunction } from "../test/foo.ts";
dummyFunction("hello", "this is dashboard page");`}

</CodeBlock>
  </TabItem>
  <TabItem value="ts" label="after">
    <CodeBlock language="ts">
      {`import { dummyFunction } from "../test/foo.ts";

dummyFunction({
"title": "hello",
"description": "this is dashboard page"
});`}

</CodeBlock>
  </TabItem>
</Tabs>
