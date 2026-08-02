# Task: Initial scaffold and local build

## Status: COMPLETE

## Decision refs
- ADR-001 asset structure
- SPECS.md sections 2/5/6

## Files to touch
- `src/_includes/post-list.njk`
- `src/index.njk`
- `src/writing.njk`
- `src/artifacts.njk`
- `src/about.md`
- `src/now.md`
- `.eleventy.js`

## Steps
-[x] Review canonical docs and accepted ADR
 -[x] Draft scaffold plan
-[x] Create config and template files
-[x] Fix build/runtime errors (layout chaining, rssFeed collection, xmlEscape, filter controls)
-[ ] Run `npm audit` and fix elevated findings
-[x] Run `npm run build` and verify outputs (10 files, 0 errors)
