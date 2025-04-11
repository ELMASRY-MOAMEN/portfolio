export const langs = ['fr', 'en'] as const;
export type Lang = (typeof langs)[number]; 