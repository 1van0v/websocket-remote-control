import { mouse } from '@nut-tree/nut-js';
import { NotSupportedError } from './errors';
import { Action, Command, CommandKey } from './models';

export const parseCommand = async (commandStr: string): Promise<Action<CommandKey>> => {
  const [command, ...args] = commandStr.split(' ') as [CommandKey, ...Array<string>];

  if (!Command[command]) {
    throw new NotSupportedError(command);
  }

  const { x, y } = await mouse.getPosition();

  return {
    command,
    args: (args || []).map((i) => +i),
    cursor: { x, y },
  };
};
