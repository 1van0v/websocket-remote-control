import { CustomError } from './custom.error';

export class NotSupportedError extends CustomError {
  constructor(cmdStr?: string) {
    super((cmdStr || '') + ' is unknown command');
  }
}
