import { handleDrawingAction, handleMouseAction } from './action-handlers';
import { NotSupportedError } from './errors';
import { Action, CommandKey, DrawingAction, DrawingCommand, MouseAction, MouseCommand } from './models';

export const actionDispatcher = (action: Action<CommandKey>): Promise<string> => {
  if (action.command in MouseCommand) {
    return handleMouseAction(action as MouseAction);
  } else if (action.command in DrawingCommand) {
    return handleDrawingAction(action as DrawingAction);
  }

  throw new NotSupportedError();
};
