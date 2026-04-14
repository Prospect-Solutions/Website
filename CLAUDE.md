# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for **Prospect Solutions**, an AI-native technology consultancy. It's a pure static site — HTML, CSS, and vanilla JavaScript with no build step, package manager, or framework.

## Running Locally

Open `index.html` directly in a browser, or serve it with:

```bash
py -m http.server 8000
# then visit http://localhost:8000
```

Note: use `py` (not `python`) on this machine — the Python Launcher is installed but `python` is intercepted by Windows App Execution Aliases in the shell.

No install step is needed.

## Architecture

The site is three files:

- **[index.html](index.html)** — all page markup. Sections: nav, hero, services (Assess/Match/Build/Embed cards), process flow, platform features, contact form, footer.
- **[style.css](style.css)** — all styles. Design tokens are defined as CSS variables at the top (`--color-accent: #c8a96e`, etc.). Animation delays use `.delay-1/.delay-2/.delay-3` utility classes.
- **[main.js](main.js)** — all interactivity: scroll-state nav, mobile hamburger menu, IntersectionObserver reveal animations, smooth anchor scrolling (80px nav offset), and the EmailJS contact form integration.

The `developer/` directory contains internal HTML dashboards (architecture, roadmap, checklist) that are noindex'd and not part of the public site. The `wiki/` directory is an Obsidian vault excluded from git (see Wiki section below).

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a0c` |
| Accent (gold) | `#c8a96e` |
| Text | `#e8e8ec` |
| Muted text | `#7a7a8a` |
| Display font | Cormorant Garamond |
| Body font | Outfit |
| Mono font | DM Mono |

## Wiki (Knowledge Base)

The `wiki/` folder is an Obsidian vault that serves as the persistent knowledge base for Prospect Solutions. It follows the [Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): Claude incrementally builds and maintains structured markdown pages rather than re-reading raw sources on every query. The wiki is excluded from git — it lives only on this machine.

### Structure

- **[wiki/index.md](wiki/index.md)** — catalog of every page with a one-line summary, organised by category. Update this on every ingest that creates or significantly changes a page.
- **[wiki/log.md](wiki/log.md)** — append-only chronological record of all ingests, queries, and lint passes. Never edit or delete entries.
- **wiki/meetings/** — one file per meeting (e.g. `2026-04-14-client-name.md`)
- **wiki/clients/** — one file per client or prospect
- **wiki/concepts/** — frameworks, methodologies, and recurring ideas

### Workflows

**Ingest** (when the user shares a meeting note, document, or conversation):
1. Read the source material and discuss key takeaways with the user
2. Create or update the relevant page(s) in the appropriate folder
3. Update or create the client/concept pages that the new content touches
4. Update `wiki/index.md` with any new pages
5. Append an `INGEST` line to `wiki/log.md`

**Query** (when the user asks a question against the wiki):
1. Read `wiki/index.md` to find relevant pages
2. Read those pages and synthesise an answer with citations (e.g. `[meeting 2026-04-14](wiki/meetings/2026-04-14-client.md)`)
3. If the answer generates a useful analysis worth keeping, file it back as a new page
4. Append a `QUERY` line to `wiki/log.md`

**Lint** (periodic health check — run when asked):
1. Scan all pages for: broken links, orphan pages not in `index.md`, contradictions between pages, stale claims
2. Report findings to the user and fix with approval
3. Append a `LINT` line to `wiki/log.md`

### Page Conventions

- Use `[[wikilinks]]` for cross-references (Obsidian-native)
- Frontmatter: `date`, `type` (meeting/client/concept), `tags`
- Meeting pages: include date, attendees, decisions made, open questions, and links to relevant client/concept pages
- Keep pages focused — split when a page covers more than one entity or concept

### MCP Integration

Install the [obsidian-claude-code-mcp](https://github.com/iansinnott/obsidian-claude-code-mcp) plugin inside Obsidian. It exposes the vault to Claude Code via WebSocket (auto-discovered on port 22360) — no API keys required. Once installed, run `/ide` in Claude Code to connect.

## EmailJS Integration

Contact form submissions are sent via EmailJS (no backend). Credentials are in `main.js`:

- Public Key: `-NqIm1SITnPbOERRf`
- Service ID: `service_rnv4a8q`
- Template ID: `template_6qv7srw`
- Destination: `hello@prospect.solutions`
