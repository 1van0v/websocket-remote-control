export const MouseCommand = {
  mouse_position: 'mouse_position',
  mouse_up: 'mouse_up',
  mouse_down: 'mouse_down',
  mouse_left: 'mouse_left',
  mouse_right: 'mouse_right',
} as const;

export type MouseCommandKey = keyof typeof MouseCommand;