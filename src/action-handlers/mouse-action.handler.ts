import { mouse, Point } from '@nut-tree/nut-js';

import { Action, ActionHandler, CommandKey, MouseAction, MouseCommand, MouseCommandKey, PathGetter } from '../models';

const moveMouse = async (action: Action<CommandKey>, getPath: PathGetter) => {
  const offset = action.args[0];
  const path = getPath(action).map(({ x, y }) => new Point(x, y));
  await mouse.move(path);
  return offset.toString();
};

const getMousePosition = async (action: MouseAction): Promise<string> => {
  const { x, y } = action.cursor;
  return `${action.command} ${x}px,${y}px`;
};

const moveMouseUp = async (action: MouseAction): Promise<string> => {
  return moveMouse(action, ({ cursor: { x, y }, args: [offset = 0] }) => [{ x, y: y - offset }]);
};

const moveMouseDown = async (action: MouseAction): Promise<string> => {
  return moveMouse(action, ({ cursor: { x, y }, args: [offset = 0] }) => [{ x, y: y + offset }]);
};

const moveMouseRight = async (action: MouseAction): Promise<string> => {
  return moveMouse(action, ({ cursor: { x, y }, args: [offset = 0] }) => [{ x: x + offset, y }]);
};

const moveMouseLeft = async (action: MouseAction): Promise<string> => {
  return moveMouse(action, ({ cursor: { x, y }, args: [offset = 0] }) => [{ x: x - offset, y }]);
};

const handlerMap: Record<MouseCommandKey, ActionHandler<MouseCommandKey>> = {
  [MouseCommand.mouse_position]: getMousePosition,
  [MouseCommand.mouse_up]: moveMouseUp,
  [MouseCommand.mouse_down]: moveMouseDown,
  [MouseCommand.mouse_right]: moveMouseRight,
  [MouseCommand.mouse_left]: moveMouseLeft,
};

export const handleMouseAction: ActionHandler<MouseCommandKey> = (action: MouseAction): Promise<string> => {
  const handler = handlerMap[action.command];

  return handler(action);
};
