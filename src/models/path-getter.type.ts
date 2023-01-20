import {  ActionData } from './action.model';
import { Position } from './position.model';

export type PathGetter = (props: ActionData) => Position[];
