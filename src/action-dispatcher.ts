import { handleMouseAction } from './action-handlers';
import { NotSupportedError } from './errors';
import { Action, MouseCommand } from './models';

export const actionDispatcher = (action: Action): Promise<string> => {
  if (action.command in MouseCommand) {
    return handleMouseAction(action);
  }

  throw new NotSupportedError();
};
