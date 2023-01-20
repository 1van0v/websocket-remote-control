export const DrawingCommand = {
  draw_circle: 'draw_circle',
  draw_square: 'draw_square',
  draw_rectangle: 'draw_rectangle',
} as const;

export type DrawingCommandKey = keyof typeof DrawingCommand;