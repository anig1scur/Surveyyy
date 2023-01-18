import { Model } from 'mongoose';
import * as Mongoose from 'mongoose';
import { SurveyModel, Survey } from '../models/Survey';

import * as fp from 'fastify-plugin';

export interface Models {
  survey: Model<SurveyModel>;
}

export interface Db {
  models: Models;
}
