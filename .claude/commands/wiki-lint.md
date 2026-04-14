Run a health check on the wiki and report findings.

## Steps

1. Read `wiki/index.md` to get the full list of pages.
2. For each page listed in the index, verify the file exists.
3. Scan all pages and check for:
   - **Orphan pages** — files in the wiki that are not listed in `wiki/index.md`
   - **Broken wikilinks** — `[[links]]` that point to pages that don't exist
   - **Missing cross-references** — pages about the same client or concept that don't link to each other
   - **Contradictions** — conflicting facts across pages (e.g. different names for the same person, different dates for the same event)
   - **Stale placeholders** — sections left empty (e.g. `## Attendees` with no content)
4. Report findings grouped by severity:
   - **Fix now** — broken links, missing index entries
   - **Review** — contradictions, stale content
   - **Consider** — missing cross-references, orphans
5. For each "Fix now" issue, ask for approval then fix it.
6. Append a line to `wiki/log.md`: `YYYY-MM-DD | LINT | <summary of findings>`
