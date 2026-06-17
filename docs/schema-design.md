# Research Site Content Schema

> This document defines the reusable content model for research sites. It separates the stable framework from project-specific research material, article source content, generated translations, and page-level presentation choices.

## 1. Core Principle

The research site should be reusable across different research subjects.

The framework owns layout, routing, rendering, design tokens, shared components, and language behavior. A project owns the research subject, positioning, topic list, and content. Individual articles own only their source Markdown, metadata, datasets, and optional visual presentation plan.

HTML pages are generated artifacts. They should not be the long-term source of truth.

## 2. Concept Layers

```text
Author  = who writes the research; reused across all projects
Project = what this research project is about; one per subject or domain
Topic   = one article/report inside a project
Content = language-specific Markdown source for a topic
Design  = optional structured presentation plan for a topic
Data    = reusable structured datasets used by visual blocks
Output  = generated HTML and static assets
```

## 3. Recommended Directory Structure

```text
framework/
  assets/
  renderer/
  components/
  schemas/

configs/
  author.config.json

projects/
  sap/
    project.config.json
    topics.index.json
    content/
      topics/
        profit-model/
          meta.json
          zh.md
          en.md
          design.json
          data.json
    output/
      topics/
        profit-model.html
        en-profit-model.html

  siemens/
    project.config.json
    topics.index.json
    content/
```

For the current static implementation, `framework/` may still be represented by root-level `index.html`, `assets/`, and `config.js`. The target architecture should still follow the ownership boundaries above.

## 4. Author Config

`author.config.json` is global. It represents the author's reusable identity and should not contain project-specific claims.

```json
{
  "id": "duan",
  "name": "Duan",
  "location": "Berlin",
  "bio": {
    "zh": "Duan，曾在办公协同与效率软件领域担任产品经理 6 年，目前于柏林求学，持续关注德国 B2B 软件、企业数字化与 AI 落地相关议题。",
    "en": "Duan is a product manager with 6 years of experience in office collaboration and productivity software, currently based in Berlin and focused on German B2B software, enterprise digitalization, and AI adoption."
  },
  "focusAreas": {
    "zh": [
      "德国 B2B 软件市场的结构与特征",
      "企业如何在特定市场、文化与监管环境下定义问题、设计产品并推进 Go-to-Market",
      "数字化与 AI 系统如何真正被组织采用"
    ],
    "en": [
      "The structure and characteristics of the German B2B software market",
      "How companies define problems, design products, and execute Go-to-Market in specific market and regulatory contexts",
      "How digitalization and AI systems are genuinely adopted by organizations"
    ]
  },
  "disclaimer": {
    "zh": "相关研究与分析主要基于公开信息、行业观察与个人理解整理，内容仅用于学习交流与观点讨论，不构成商业、法律或投资建议。",
    "en": "Research and analysis are based primarily on public information, industry observation, and personal interpretation. Content is for learning and discussion only, and does not constitute commercial, legal, or investment advice."
  },
  "links": {
    "email": "",
    "website": "",
    "linkedin": ""
  }
}
```

Required fields:

- `id`
- `name`
- `bio`
- `disclaimer`

Optional fields:

- `location`
- `focusAreas`
- `links`

## 5. Project Config

`project.config.json` describes one research project. It changes when the research subject changes.

```json
{
  "projectId": "sap-research",
  "projectType": "company-research",
  "defaultLang": "zh",
  "supportedLangs": ["zh", "en"],
  "site": {
    "name": {
      "zh": "SAP Research",
      "en": "SAP Research"
    },
    "tagline": {
      "zh": "企业软件、云转型与德国 B2B 生态研究",
      "en": "Enterprise Software, Cloud Transition, and the German B2B Ecosystem"
    }
  },
  "subject": {
    "type": "company",
    "name": "SAP SE",
    "shortName": "SAP",
    "ticker": "SAP",
    "exchange": "NYSE · XETRA",
    "founded": "1972",
    "hq": "Walldorf, Germany",
    "employees": "~107,000"
  },
  "positioning": {
    "zh": {
      "description": "SAP 是全球最大的企业应用软件公司之一……",
      "researchMotivation": "研究 SAP 的价值在于，它是德国 B2B 软件生态的基础设施……",
      "coreQuestions": [
        "SAP 的护城河来自哪里？",
        "云转型战略的真实进展如何？",
        "AI 集成能否成为下一个增长引擎？"
      ]
    },
    "en": {
      "description": "SAP is one of the world's largest enterprise application software companies...",
      "researchMotivation": "Studying SAP matters because it functions as infrastructure for the German B2B software ecosystem...",
      "coreQuestions": [
        "Where does SAP's moat come from?",
        "How real is the progress of its cloud transformation?",
        "Can AI integration become the next growth engine?"
      ]
    }
  },
  "metadata": [
    {
      "key": "marketCap",
      "label": {
        "zh": "市值",
        "en": "Market Cap"
      },
      "value": {
        "zh": "约 $2,500 亿（2026 年）",
        "en": "~$250B (2026)"
      }
    }
  ]
}
```

Required fields:

- `projectId`
- `projectType`
- `defaultLang`
- `supportedLangs`
- `site.name`
- `subject`
- `positioning`

Project config should not include:

- full article bodies
- page-specific visual blocks
- generated HTML paths for individual topics
- author biography duplicated from `author.config.json`

## 6. Topics Index

`topics.index.json` is the project-level table of contents. It powers the homepage, sidebar, language switching, and topic cards.

```json
{
  "topics": [
    {
      "id": "P1M1",
      "slug": "profit-model",
      "status": "published",
      "canonicalLang": "zh",
      "availableLangs": ["zh", "en"],
      "publishDate": "2026-05-14",
      "lastUpdated": "2026-05-18",
      "readingTime": {
        "zh": 18,
        "en": 20
      },
      "title": {
        "zh": "盈利模式及其变迁",
        "en": "Profit Model & Transformation"
      },
      "subtitle": {
        "zh": "SAP 如何赚钱：从一次性授权到云订阅的收入重构",
        "en": "How SAP makes money: from perpetual licenses to cloud subscriptions"
      },
      "summary": {
        "zh": "基于五年财务数据，解析 SAP 收入结构的变迁逻辑。",
        "en": "Drawing on five years of financial data, this report analyzes SAP's revenue structure evolution."
      },
      "tags": {
        "zh": ["财务", "云转型", "商业模式"],
        "en": ["Financials", "Cloud Transition", "Business Model"]
      },
      "paths": {
        "zh": "content/topics/profit-model/zh.md",
        "en": "content/topics/profit-model/en.md"
      }
    }
  ]
}
```

Required fields per topic:

- `id`
- `slug`
- `status`
- `canonicalLang`
- `availableLangs`
- `title`
- `summary`
- `paths`

Recommended status values:

- `draft`
- `in-review`
- `published`
- `archived`

## 7. Topic Meta

`content/topics/{slug}/meta.json` is the pipeline control file for a single topic.

```json
{
  "id": "P1M1",
  "slug": "profit-model",
  "canonicalLang": "zh",
  "status": "published",
  "content": {
    "source": {
      "zh": "zh.md",
      "en": "en.md"
    },
    "generated": {
      "zh": "output/topics/profit-model.html",
      "en": "output/topics/en-profit-model.html"
    }
  },
  "translation": {
    "en": {
      "sourceLang": "zh",
      "status": "generated",
      "generatedAt": "2026-05-18",
      "reviewStatus": "needs-review"
    }
  },
  "display": {
    "template": "article",
    "toc": true,
    "showSources": true,
    "showReadingProgress": false
  }
}
```

This file exists for generation and validation. Public UI should generally use `topics.index.json`, not this file.

Translation status values:

- `missing`
- `generated`
- `needs-update`
- `reviewed`

Review status values:

- `needs-review`
- `reviewed`
- `locked`

## 8. Markdown Content

Markdown files are the source of article text. They may contain lightweight frontmatter, but complex metadata should stay in JSON.

```md
---
title: 盈利结构、客户迁移与 AI/Data 战略转型
短标题: 盈利模式
description: 基于五年财务数据，解析 SAP 收入结构与云转型逻辑。
type: ""
status: draft
category: 盈利模式
tags:
  - 财务
  - 云转型
  - 商业模式
created: 2026-05-14
---

## 研究目的

正文……
```

Markdown rules:

- Topic Markdown frontmatter should use this lightweight field order: `title`, `短标题`, `description`, `type`, `status`, `category`, `tags`, `created`.
- `type` defaults to an empty string when no explicit article type is needed.
- `status` should be `draft` or `published`.
- Heading IDs must be stable after first publication.
- Numeric data, source links, and table structures must be preserved during translation.
- Canonical language is the source of truth.
- Generated language files should record generation metadata in `meta.json`, not in the prose.

## 9. Design Config

`design.json` describes article-specific presentation through structured blocks. It should not contain arbitrary HTML, CSS, or JavaScript.

```json
{
  "visualBlocks": [
    {
      "type": "stat_strip",
      "position": {
        "afterHeading": "revenue-structure"
      },
      "items": [
        {
          "label": {
            "zh": "Cloud 收入占比",
            "en": "Cloud Revenue Share"
          },
          "value": "57.1%",
          "note": {
            "zh": "2025 年总收入占比",
            "en": "Share of total revenue in 2025"
          }
        },
        {
          "label": {
            "zh": "License 占比",
            "en": "License Share"
          },
          "value": "2.7%"
        }
      ]
    },
    {
      "type": "data_table",
      "position": {
        "afterHeading": "revenue-table"
      },
      "dataRef": "revenue_mix_2023_2025"
    }
  ]
}
```

Allowed block types should be centrally defined by the framework. Initial recommended types:

- `callout`
- `stat_strip`
- `data_table`
- `bar_chart`
- `stacked_bar`
- `comparison_matrix`
- `timeline`
- `source_list`
- `conclusion_list`

## 10. Data Config

`data.json` stores reusable structured datasets for a topic.

```json
{
  "datasets": {
    "revenue_mix_2023_2025": {
      "unit": "EUR million",
      "source": {
        "label": "SAP 2025 Integrated Report",
        "url": "https://www.sap.com/integrated-reports/2025/en/datahub/financial-data.html"
      },
      "columns": ["type", "2023", "2024", "2025"],
      "rows": [
        ["Cloud", 13664, 17141, 21023],
        ["Software licenses", 1764, 1399, 990],
        ["Software support", 11496, 11290, 10525],
        ["Services", 4283, 4346, 4262]
      ]
    }
  }
}
```

Data rules:

- Numbers should be stored as numbers, not formatted strings, unless formatting is part of the value.
- Source labels and URLs should be attached to datasets.
- Display formatting belongs to the renderer, not the dataset.

## 11. Translation Pipeline

The pipeline should treat one language as canonical.

Example:

```json
{
  "canonicalLang": "zh",
  "generatedLangs": ["en"]
}
```

Recommended process:

1. Read canonical Markdown and topic metadata.
2. Extract headings, tables, source links, terms, and numeric data.
3. Generate target-language Markdown.
4. Preserve heading IDs, table structure, links, and numeric values.
5. Generate or update localized metadata fields.
6. Mark target language as `generated` and `needs-review`.
7. Render both languages through the same renderer.

When the canonical Markdown changes, generated translations should be marked `needs-update` until regenerated or reviewed.

## 12. Framework vs Project Ownership

Framework owns:

- routing
- language switching behavior
- article shell
- homepage layout
- sidebar and TOC
- design tokens
- common components
- renderer
- schema validation

Project owns:

- project identity
- research subject
- project positioning
- topic list
- source content
- datasets
- article-specific visual block choices

Generated output owns:

- static HTML
- generated article pages
- generated language variants
- static build artifacts

Generated output may be deleted and rebuilt.

## 13. Anti-Hardcoding Rules

Do not hardcode these inside generated or hand-authored HTML:

- site name
- project subject
- author bio
- topic title
- subtitle
- publish date
- reading time
- tags
- language links
- source Markdown path
- repeated component CSS

Allowed article-specific customization:

- selected visual block types
- visual block ordering
- dataset references
- local explanatory copy in Markdown
- renderer-supported component options

## 14. Migration Plan for Current SAP Project

1. Create global `configs/author.config.json`.
2. Move SAP-specific project fields from `config.js` into `projects/sap/project.config.json`.
3. Convert `RESEARCH_CONFIG.topics` into `projects/sap/topics.index.json`.
4. Move source Markdown into `projects/sap/content/topics/{slug}/`.
5. Add `meta.json` for each topic.
6. Move reusable visual styles from article HTML into framework CSS/components.
7. Convert per-article chart data into `data.json`.
8. Convert per-article layout decisions into `design.json`.
9. Generate article HTML from Markdown + metadata + design config.
10. Treat existing `topics/*.html` as generated output after migration.
