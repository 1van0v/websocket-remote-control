import { Action, ActionHandler, CommandKey } from '../models';

export const handleAction = <T extends CommandKey, S = string>(
  handlerMap: Record<T, ActionHandler<T, S>>,
  action: Action<T>
): Promise<S> => {
  const handler = handlerMap[action.command];
  return handler(action);
};
