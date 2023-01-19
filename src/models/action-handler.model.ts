import { Action } from "./action.model";

export type ActionHandler = (action: Action) => Promise<string>;