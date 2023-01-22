import { mouse, Point } from '@nut-tree/nut-js';
import { ActionData, ActionHandler, DrawingAction, DrawingCommand, DrawingCommandKey, PathGetter } from '../models';
import { Position } from '../models/position.model';
import { handleAction } from './common.handler';

const dragMouse = async (action: DrawingAction, getPath: PathGetter): Promise<void> => {
  const points = getPath(action).map(({ x, y }) => new Point(x, y));

  const firstPoint = points.slice(0, 1);
  await mouse.move(firstPoint);

  await mouse.drag(points);

  return;
};

const getLine = (line: Position[], direction: keyof Position, value: number): Position[] => {
  const start = line.slice(-1)[0];
  let step = value / 200;
  let i = start[direction];
  const end = i + value;
  const points: Position[] = [];

  if (Math.abs(step) < 1) {
    step = step < 0 ? -1 : 1;
  }

  while (value > 0 ? end > i : i > end) {
    i += step;
    points.push({
      ...start,
      [direction]: i,
    });
  }

  return points;
};

const getRectanglePath = (action: ActionData): Position[] => {
  const [width = 0, height] = action.args;
  const actualHeight = height || width;

  const points: Position[] = getLine([action.cursor], 'x', width);

  points.push(...getLine(points, 'y', actualHeight));
  points.push(...getLine(points, 'x', -width));
  points.push(...getLine(points, 'y', -actualHeight));

  return points;
};

const drawCircle = async (action: DrawingAction): Promise<string> => {
  await dragMouse(action, (action) => {
    const [radius = 0] = action.args;
    const points: Position[] = [];
    const maxRadians = Math.PI * 2;
    const step = maxRadians / 360;

    for (let i = 0; i <= maxRadians; i += step) {
      const yShift = Math.sin(i) * radius;
      const xShift = Math.cos(i) * radius;
      points.push({
        x: action.cursor.x + xShift,
        y: action.cursor.y + yShift,
      });
    }

    return points;
  });

  return action.args[0]?.toString();
};

const drawSquare = async (action: DrawingAction): Promise<string> => {
  await dragMouse(action, getRectanglePath);
  const [width, height] = action.args;

  return height ? width + ' ' + height : width.toString();
};

const handlerMap: Record<DrawingCommandKey, ActionHandler<DrawingCommandKey>> = {
  [DrawingCommand.draw_circle]: drawCircle,
  [DrawingCommand.draw_square]: drawSquare,
  [DrawingCommand.draw_rectangle]: drawSquare,
};

export const handleDrawingAction = (action: DrawingAction): Promise<string> => {
  return handleAction(handlerMap, action);
};
