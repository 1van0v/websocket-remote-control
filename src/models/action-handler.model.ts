import { Action } from './action.model';
import { CommandKey } from './command';

export type ActionHandler<T extends CommandKey, S = string> = (action: Action<T>) => Promise<S>;
