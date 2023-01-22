import { Image } from '@nut-tree/nut-js';
import { handleDrawingAction, handleMouseAction } from './action-handlers';
import { handleScreenAction } from './action-handlers/screen-action.handler';
import { NotSupportedError } from './errors';
import { Action, CommandKey, DrawingAction, DrawingCommand, MouseAction, MouseCommand, ScreenAction, ScreenCommand } from './models';

export const actionDispatcher = (action: Action<CommandKey>): Promise<string | Image> => {
  if (action.command in MouseCommand) {
    return handleMouseAction(action as MouseAction);
  } else if (action.command in DrawingCommand) {
    return handleDrawingAction(action as DrawingAction);
  } else if (action.command in ScreenCommand) {
    return handleScreenAction(action as ScreenAction);
  }

  throw new NotSupportedError();
};
