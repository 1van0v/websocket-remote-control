import { CommandKey } from './command';
import { DrawingCommandKey } from './drawing-command';
import { MouseCommandKey } from './mouse-command';
import { Position } from './position.model';

export interface ActionData {
  args: number[];
  cursor: Position;
}

export interface Action<T extends CommandKey> extends ActionData {
  command: T;
}

export type DrawingAction = Action<DrawingCommandKey>;
export type MouseAction = Action<MouseCommandKey>;
