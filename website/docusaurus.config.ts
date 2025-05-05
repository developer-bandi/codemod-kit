import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import webpack from "webpack";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: "Codemon Kit",
  tagline: "A tool that makes large-scale refactoring easier and safer.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://codemod-kit.netlify.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "developer-bandi", // Usually your GitHub org/user name.
  projectName: "codemon-kit", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "transformers",
        path: "transformers",
        routeBasePath: "transformers",
        sidebarPath: require.resolve("./sidebarRules.ts"),
      },
    ],
    function webpackConfingPlugin() {
      return {
        name: "custom-docusaurus-plugin",
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                os: require.resolve("os-browserify/browser"),
                path: require.resolve("path-browserify"),
                constants: require.resolve("constants-browserify"),
                assert: require.resolve("assert"),
                // 나머지는 false로
                fs: false,
                child_process: false,
                module: false,
                readline: false,
                worker_threads: false,
                perf_hooks: false,
              },
            },
            plugins: [
              new webpack.ProvidePlugin({
                process: "process/browser",
              }),
            ],
          };
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Codemon Kit",
      logo: {
        alt: "Codemon Kit Logo",
        src: "img/logo.svg",
        href: "/home",
      },
      items: [
        { to: "/docs/getting-started", label: "Docs", position: "left" },
        {
          to: "/transformers/category/import",
          label: "Transformers",
          position: "left",
        },
        { to: "/playground", label: "Playground", position: "left" },
        {
          href: "https://github.com/사용자명/레포명",
          position: "right",
          className: "navbar-icon-link github-icon",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Codemod Kit, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
