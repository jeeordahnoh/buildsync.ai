<!--
  BuildSync AI · CLAUDE.md
  Author:    Giordano Bertin-Maurice
  Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
  WHAT IT IS: standing instructions for AI coding sessions (Claude Code) in this
  repository. The owner's rules below take precedence over any default behaviour.
-->

# Working rules for this repository

The owner and author of all code here is **Giordano Bertin-Maurice**. The code is
their intellectual property.

## 1. No AI co-authorship or attribution

- Do **not** add `Co-Authored-By`, `Claude-Session` or any similar trailer to
  commit messages.
- Do **not** add "Generated with Claude Code" or any AI attribution line or link to
  commit messages, pull request titles or descriptions, code comments or files.
- Commits are authored by the owner:
  `Giordano Bertin-Maurice <99845354+jeeordahnoh@users.noreply.github.com>`
  (set `git config user.name` / `user.email` to this in a fresh clone before
  committing).

## 2. Every file carries the author header

Each source file starts with a header comment:

```
BuildSync AI · <path of the file>
Author:    Giordano Bertin-Maurice
Copyright: © 2026 Giordano Bertin-Maurice. All rights reserved.
WHAT IT DOES / WHAT IT IS FOR / USED BY / IF SOMETHING BREAKS
```

Use the comment style of the file type (`/** */` for TS/CSS/JS, `//` in
`tsconfig.json`, `#` in `.gitignore`, `<!-- -->` in Markdown). JSON files that
cannot hold comments (`package.json`) use the `author`, `license` and
`description` fields instead. Generated files (`package-lock.json`,
`next-env.d.ts`) are not edited. New files must follow this rule too.

## 3. Comment for debugging

Components, functions, constants and each homepage section say what they do and
what they are for. Where something is not wired up yet (newsletter, search,
waitlist, tracking attributes, missing pages) the comment says so, so a missing
behaviour is never mistaken for a bug.

## 4. Quality bar

- The homepage must work on current desktop, laptop, tablet and phone browsers
  (Chrome, Edge, Firefox, Safari, Samsung Internet) with no horizontal page scroll
  from 280px to very wide screens, and with touch as well as mouse and keyboard.
  The supported versions are the `browserslist` in `package.json` (see the README
  table); keep the two in step.
- Wrap any new `:hover` style in `@media (hover: hover)`; never make a menu depend
  on mouse events alone (use pointer events and check `pointerType`).
- Keep fonts and other core assets on this site. Do not add Google Fonts or other
  third-party links.
- Run `npm run typecheck` and `npm run build` before committing.
