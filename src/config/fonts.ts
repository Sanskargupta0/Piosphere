/**
 * Selectable UI fonts (Settings -> Appearance, `/settings/appearance`).
 *
 * Each name here needs a matching `--font-<name>` token in
 * `src/styles/theme.css` under `@theme inline`. Tailwind turns that token
 * into the `font-<name>` utility class, and `FontProvider` puts exactly
 * that class on `<html>`. A name in this array with no token is a dead
 * menu entry: the class lands and nothing resolves it, so the choice
 * silently renders as `--font-sans` (FE #1251).
 *
 * Fonts are self-hosted and bundled by Vite. To add one:
 * 1. `pnpm add -w @fontsource-variable/<font>`
 * 2. `@import '@fontsource-variable/<font>';` in `src/styles/index.css`
 * 3. `--font-<name>: '<Family> Variable', ...;` in `theme.css`
 * 4. add the name here
 *
 * Never add a `fonts.googleapis.com` URL. The app must render correctly
 * with no network, and a CDN face fails silently by falling back rather
 * than erroring, so nothing catches the regression.
 *
 * `montserrat` is first because it is the default `--font-sans` and so
 * the face the app has always rendered in. Reordering this array changes
 * what every user with no saved preference sees.
 */
export const fonts = ['montserrat', 'inter', 'manrope', 'system'] as const
