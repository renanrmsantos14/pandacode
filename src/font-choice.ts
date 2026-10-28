/** The interface font. "Anthropic Sans" is only listed by name, so it is used where already installed; the files are
 * proprietary and never bundled. The free fonts below are the look-alikes that ship with the app. */
export type FontId = 'default' | 'anthropic' | 'codex';

type FontChoice = { id: FontId; label: string; description: string; sans?: string; mono?: string; load?: () => Promise<unknown> };

const SYSTEM = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const FONTS: FontChoice[] = [
  { id: 'default', label: 'PandaCode', description: 'System font' },
  {
    id: 'anthropic', label: 'Claude style', description: 'Hanken Grotesk, close to Anthropic Sans',
    sans: `"Anthropic Sans", "Hanken Grotesk Variable", ${SYSTEM}`,
    load: () => import('@fontsource-variable/hanken-grotesk'),
  },
  {
    id: 'codex', label: 'Codex style', description: 'Geist and Geist Mono',
    sans: `"Geist Variable", ${SYSTEM}`,
    mono: '"Geist Mono Variable", "SF Mono", "Cascadia Code", Consolas, monospace',
    load: () => Promise.all([import('@fontsource-variable/geist'), import('@fontsource-variable/geist-mono')]),
  },
];

const KEY = 'pandacode.font';

export function currentFont(): FontId {
  try {
    const saved = localStorage.getItem(KEY);
    return FONTS.some(font => font.id === saved) ? saved as FontId : 'default';
  } catch { return 'default'; }
}

/** Applies the font to the whole window; the default removes the overrides so the stylesheet decides. */
export async function applyFont(id: FontId, remember = true): Promise<void> {
  const font = FONTS.find(entry => entry.id === id) ?? FONTS[0]!;
  const root = document.documentElement;
  try { await font.load?.(); } catch { /* the stack falls back to the system font */ }
  if (font.sans) root.style.fontFamily = font.sans; else root.style.removeProperty('font-family');
  if (font.mono) root.style.setProperty('--mono', font.mono); else root.style.removeProperty('--mono');
  if (!remember) return;
  try { localStorage.setItem(KEY, font.id); } catch { /* the choice only lasts for this session */ }
}

export function initFont(): void {
  const id = currentFont();
  if (id !== 'default') void applyFont(id, false);
}
