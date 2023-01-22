export const ScreenCommand = {
  prnt_scrn: 'prnt_scrn',
} as const;

export type ScreenCommandKey = keyof typeof ScreenCommand;
