import { DrawingCommand } from './drawing-command';
import { MouseCommand } from './mouse-command';
import { ScreenCommand } from './screen-command';

export const Command = {
  ...MouseCommand,
  ...DrawingCommand,
  ...ScreenCommand,
} as const;

export type CommandKey = keyof typeof Command;
