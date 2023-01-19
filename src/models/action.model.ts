import { CommandKey } from './command';

export interface Action {
  command: CommandKey;
  args: string[];
}
