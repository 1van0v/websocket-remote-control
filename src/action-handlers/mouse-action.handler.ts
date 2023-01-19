import { mouse, Point } from '@nut-tree/nut-js';

import { Action, ActionHandler, MouseCommand, MouseCommandKey } from '../models';

const getOffset = (action: Action): number => {
  const [offset = 0] = action.args;

  return +offset;
};

const move = async (action: Action, getPath: (point: Point, offset: number) => Pick<Point, 'x' | 'y'>[]) => {
  const currentPosition = await mouse.getPosition();
  const offset = getOffset(action);
  const path = getPath(currentPosition, offset).map(({ x, y }) => new Point(x, y));
  await mouse.move(path);
  return `${action.command} ${offset}`;
};

const getMousePosition = async (action: Action): Promise<string> => {
  const { x, y } = await mouse.getPosition();
  return `${action.command} ${x}px,${y}px`;
};

const moveMouseUp = async (action: Action): Promise<string> => {
  return move(action, ({ x, y }, offset) => [{ x, y: y - offset }]);
};

const moveMouseDown = async (action: Action): Promise<string> => {
  return move(action, ({ x, y }, offset) => [{ x, y: y + offset }]);
};

const moveMouseRight = async (action: Action): Promise<string> => {
  return move(action, ({ x, y }, offset) => [{ x: x + offset, y }]);
};

const moveMouseLeft = async (action: Action): Promise<string> => {
  return move(action, ({ x, y }, offset) => [{ x: x - offset, y }]);
};

const handlerMap: Record<MouseCommandKey, ActionHandler> = {
  [MouseCommand.mouse_position]: getMousePosition,
  [MouseCommand.mouse_up]: moveMouseUp,
  [MouseCommand.mouse_down]: moveMouseDown,
  [MouseCommand.mouse_right]: moveMouseRight,
  [MouseCommand.mouse_left]: moveMouseLeft,
};

export const handleMouseAction: ActionHandler = (action: Action): Promise<string> => {
  const handler = handlerMap[action.command];

  return handler(action);
};
