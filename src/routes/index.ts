import { RouteOptions } from 'fastify';

import UploadController from './Upload';
import ConfirmController from './Confirm';
import ListMeasureController from './ListMeasure';

const routes: RouteOptions[] = [
  UploadController,
  ConfirmController,
  ListMeasureController
];

export default routes;