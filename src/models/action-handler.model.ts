import { Action } from './action.model';
import { CommandKey } from './command';

export type ActionHandler<T extends CommandKey> = (action: Action<T>) => Promise<string>;
