import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";

// SVG 파일 import
import EasyToUseSvg from "@site/static/img/easy_to_use.svg";
import TwoWaysToRunSvg from "@site/static/img/two_ways_to_run.svg";
import VariousConversionCasesSvg from "@site/static/img/various_conversion_cases.svg";

interface FeatureItem {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
}

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to use",
    Svg: EasyToUseSvg,
    description: (
      <>
        You can use it without understanding the structure of AST and the
        operation of transformation libraries such as jscodeshift.
      </>
    ),
  },
  {
    title: "Two ways to run",
    Svg: TwoWaysToRunSvg,
    description: <>Supports both programmatic and cli methods.</>,
  },
  {
    title: "Various transformer cases",
    Svg: VariousConversionCasesSvg,
    description: (
      <>Provides various transformer cases for components and imports.</>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg role="img" style={{ width: "200px", height: "200px" }} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        padding: "2rem 0",
        width: "100%",
      }}
    >
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
