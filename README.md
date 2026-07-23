# Internal Notes Generator

A dark-by-default, browser-based tool that turns customer-support interaction details into clear, consistent, copy-ready internal notes.

## Live demo

Use the GitHub Pages deployment linked in this repository’s About section, or open `index.html` directly in a browser.

No installation, package manager, build step, backend, account, or network connection is required.

## Why this project exists

I originally built an internal version of this tool while working at Accenture on a customer-support engagement for a major global social media platform. Agents had to document every interaction, but repeated manual note entry consumed time and created avoidable variation in structure and completeness.

The original tool began with an approximately 10-agent pilot, expanded to more than 20 agents, and was later formalized for broader use by QA leadership. Based on observed workflows, it reduced after-contact administrative work by approximately 20–30 minutes per agent per day while improving note consistency, completeness, and QA alignment.

This repository contains a clean-room portfolio reconstruction rather than the original employer implementation.

## Features

- Guided support-interaction fields
- Context-sensitive documentation guidance
- Required-field validation
- Structured note generation
- Post-generation accuracy confirmation before copying
- Copy-to-clipboard support with a browser fallback
- Automatic invalidation when source fields change
- Responsive, accessible interface
- Native dark theme
- No local persistence or network requests

## Privacy and confidentiality

This public reconstruction contains no employer source code, internal screenshots, customer or employee data, proprietary field names, internal templates, policies, decision trees, credentials, system names, or client-specific workflow logic.

The application is designed as a generic demonstration of the same engineering pattern: translating a repetitive support workflow into structured inputs, validation rules, and human-reviewed output.

## Technology

- HTML
- CSS
- Vanilla JavaScript

A lightweight client-side implementation fits the problem because the application only needs to guide input, validate completeness, assemble text, and copy the reviewed result. No server or framework is necessary.

## Run locally

1. Download or clone the repository.
2. Open `index.html` in a modern browser.

Entered information is not stored and is cleared when the page is refreshed.

## Case study

See [`CASE_STUDY.md`](CASE_STUDY.md) for the problem, implementation approach, adoption, observed impact, and confidentiality boundaries.

## Attribution

Designed and built by **Devin Thomas**. This repository is a public, clean-room reconstruction of an internal workflow-improvement tool originally developed during his time at Accenture.

The reported time savings are approximate operational observations, not the results of a controlled analytics study.