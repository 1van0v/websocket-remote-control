import { actionDispatcher } from './action-dispatcher';
import { parseCommand } from './command-parser';
import { CustomError } from './errors';
import { Action, CommandKey } from './models';

export const commandHandler = async (msg: string): Promise<string> => {
  let action: Action<CommandKey>;

  try {
    action = await parseCommand(msg);
  } catch (e) {
    if (e instanceof CustomError) {
      return e.message;
    }

    throw e;
  }

  let commandResult = action.command;
  const actionResult = await actionDispatcher(action);

  if (actionResult) {
    commandResult += ' ' + actionResult;
  }

  return commandResult;
};
