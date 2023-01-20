import { DrawingCommand } from "./drawing-command";
import { MouseCommand } from "./mouse-command";

export const Command = {
  ...MouseCommand,
  ...DrawingCommand
} as const;

export type CommandKey = keyof typeof Command;