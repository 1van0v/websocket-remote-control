import { actionDispatcher } from './action-dispatcher';
import { parseCommand } from './command-parser';
import { CustomError } from './errors';
import { Action } from './models';

export const commandHandler = async (msg: string): Promise<string> => {
  let action: Action;

  try {
    action = parseCommand(msg);
  } catch (e) {
    if (e instanceof CustomError) {
      return e.message;
    }

    throw e;
  }

  return actionDispatcher(action)
};
