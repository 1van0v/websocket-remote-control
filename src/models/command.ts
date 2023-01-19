import { MouseCommand } from "./mouse-command";

export const Command = {
  ...MouseCommand
} as const;

export type CommandKey = keyof typeof Command;