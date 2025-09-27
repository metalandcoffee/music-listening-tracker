export const GENRES = [
  'Alternative Rock',
  'Blues',
  'Classical',
  'Country',
  'Electronic',
  'Folk',
  'Hip Hop',
  'Jazz',
  'Metal',
  'Pop',
  'Progressive Rock',
  'Punk',
  'R&B',
  'Reggae',
  'Rock',
  'Other',
] as const;

export type Genre = (typeof GENRES)[number];
