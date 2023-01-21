import { Region, screen } from '@nut-tree/nut-js';
import jimp from 'jimp';

import { ActionHandler, ScreenAction, ScreenCommand, ScreenCommandKey } from '../models';
import { handleAction } from './common.handler';

const screenshotSize = 200;

const makeScreenshot = async (action: ScreenAction): Promise<string> => {
  const { x, y } = action.cursor;
  const left = x - screenshotSize / 2;
  const top = y - screenshotSize / 2;
  const region = new Region(left, top, screenshotSize, screenshotSize);
  let nutImage = await screen.grabRegion(region);
  nutImage = await nutImage.toRGB();

  const image = await jimp.create(screenshotSize, screenshotSize);
  image.bitmap.data = nutImage.data;

  const imageEncoded = await image.getBase64Async(jimp.MIME_PNG);
  return imageEncoded.replace('data:image/png;base64,', '');
};

const handlerMap: Record<ScreenCommandKey, ActionHandler<ScreenCommandKey>> = {
  [ScreenCommand.prnt_scrn]: makeScreenshot,
};

export const handleScreenAction = (action: ScreenAction): Promise<string> => {
  return handleAction(handlerMap, action);
};
