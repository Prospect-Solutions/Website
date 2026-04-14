Ingest content into the wiki following atomic note principles.

## Source

The source is one of:
- Content pasted directly into this message
- A file path provided in this message
- The current conversation (e.g. "summarise this session", "capture the key decisions from our discussion")

## Atomic note principle

**One note = one idea.** Never put two distinct topics in the same file. When processing a meeting or session:
- The meeting note is a thin log entry (attendees, date, links) — not where the content lives
- Every distinct decision, concept, person, client, framework, or insight gets its own note
- The meeting note links out to those atomic notes; the atomic notes link back

Ask yourself: "Could I move this note to a different context and have it still make complete sense?" If yes, it's atomic.

## Steps

1. Read and understand the source material.
2. Identify every distinct entity or idea worth capturing: people, clients, decisions, concepts, frameworks, open questions, action items.
3. For each one, check if a note already exists in `wiki/index.md`. If it does, update it. If not, create a new atomic note in the right folder.
4. Create or update the meeting/session log entry that links out to all the atomic notes.
5. **Add backlinks:** for every atomic note created or updated, add a link back to the meeting log (and to any other atomic notes it's meaningfully related to) under its `## Related` section. Every note should be reachable from at least one other note — no note should exist only in the index.
6. Update `wiki/index.md` for any new pages.
7. Append a line to `wiki/log.md`: `YYYY-MM-DD | INGEST | <brief description>`

## Folder conventions

- `wiki/meetings/YYYY-MM-DD-<slug>.md` — thin log entries only
- `wiki/clients/<name>.md` — one file per client or prospect
- `wiki/people/<name>.md` — one file per person (if they recur across notes)
- `wiki/concepts/<slug>.md` — frameworks, methodologies, recurring ideas
- `wiki/decisions/<YYYY-MM-DD-slug>.md` — significant decisions with rationale

## Atomic note format

```markdown
---
date: YYYY-MM-DD
type: concept | client | person | decision
tags: []
---

# <Title>

<One focused idea, fully self-contained. No padding.>

## Related
- [[link-to-other-note]]
```

## Meeting log format

```markdown
---
date: YYYY-MM-DD
type: meeting
tags: []
---

# <Meeting title>

**Date:** YYYY-MM-DD  
**Attendees:** 

## Notes
Brief narrative of the session.

## Links
- [[atomic-note-1]]
- [[atomic-note-2]]
- [[decision-made]]
```
