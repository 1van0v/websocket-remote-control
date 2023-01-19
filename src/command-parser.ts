import { NotSupportedError } from './errors';
import { Action, Command, CommandKey,  } from './models';

export const parseCommand = (commandStr: string): Action => {
  const [command, ...args] = commandStr.split(' ') as [CommandKey, ...Array<string>];

  if (!Command[command]) {
    throw new NotSupportedError(command);
  }

  return {
    command,
    args: args || [],
  };
};
