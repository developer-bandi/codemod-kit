import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ReactNode } from "react";
import { Panel, PanelResizeHandle } from "react-resizable-panels";
import { PanelGroup } from "react-resizable-panels";
import OptionSection from "./_components/OptionSection";
import TargetCodeSection from "./_components/TargetCodeSection";
import ResultCodeSection from "./_components/ResultCodeSection";

export default function Playground(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <main style={{ height: "100vh" }}>
        <PanelGroup direction="horizontal">
          <Panel>
            <OptionSection />
          </Panel>
          <PanelResizeHandle
            style={{ width: "3px", backgroundColor: "#EAEAEA" }}
          />
          <Panel>
            <PanelGroup direction="vertical">
              <Panel>
                <TargetCodeSection />
              </Panel>
              <PanelResizeHandle
                style={{ height: "3px", backgroundColor: "#EAEAEA" }}
              />
              <Panel>
                <PanelGroup direction="horizontal">
                  <Panel>
                    <ResultCodeSection />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>
    </Layout>
  );
}
