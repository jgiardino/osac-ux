# AI vision icons

This folder holds **artwork** (`*.svg`) and the **React wrappers** that turn those
SVGs into PatternFly-compatible icon components (`AiVisionIcons.tsx`).

Shell code does not define icons here — it only maps nav items to icons via
`shell/AiVisionNavIcons.tsx`.

## Why local SVGs?

We avoid bumping `@patternfly/react-icons` for RhUi exports. Local files keep the
demo additive with no package/lockfile churn. Artwork can be swapped for any SVG;
it does not have to stay Red Hat UI.

## Files

| File | Role |
|------|------|
| `*.svg` | Artwork (edit these) |
| `AiVisionIcons.tsx` | `createIcon()` React components for those SVGs |
| `README.md` | This doc |

Current SVG names match optional PatternFly package paths (`rh-ui-*-icon`) so a
later package swap is obvious. You may rename SVGs if you replace the artwork;
keep `AiVisionIcons.tsx` in sync.

| SVG | Used for | Export in `AiVisionIcons.tsx` |
|-----|----------|-------------------------------|
| `rh-ui-ai-experience-icon.svg` | Masthead “AI vision” + nav “AI” labels | `RhUiAiExperienceIcon` |
| `rh-ui-build-icon.svg` | Workbenches | `RhUiBuildIcon` |
| `rh-ui-path-icon.svg` | Pipelines | `RhUiPathIcon` |
| `rh-ui-ai-edit-icon.svg` | Playground | `RhUiAiEditIcon` |
| `rh-ui-key-icon.svg` | API keys | `RhUiKeyIcon` |
| `rh-ui-location-pin-icon.svg` | AI asset endpoints | `RhUiLocationPinIcon` |

## How to swap artwork

1. Replace (or rename) the `.svg` file.
2. Update the matching `createIcon({ svgPath: '...' })` in `AiVisionIcons.tsx`.
3. Nav/masthead call sites stay unchanged if export names stay the same.

## Optional later: use `@patternfly/react-icons`

Export names currently match package `RhUi*` icons. To switch:

1. In `AiVisionIcons.tsx`, re-export from the package (same names), or point
   imports at the package and delete this file.
2. Remove SVGs once the package is the source of truth.

## Related shell modules

| File | Role |
|------|------|
| `shell/AiVisionNavIcons.tsx` | Nav id → icon component (shell; not in ui-components) |
| `shell/shellNavAiVision.ts` | Twin of `shellNav.ts` — additive nav |
| `shell/shellRoutesAiVision.tsx` | Twin of `shellRoutes.ts` — additive routes |
