import { Model } from 'mongoose';
import * as Mongoose from 'mongoose';
import { SurveyModel, Survey } from './models/Survey';

import { fastifyPlugin as fp } from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

export interface Models {
  Survey: Model<SurveyModel>;
}

export interface Db {
  models: Models;
}

export default fp(async (fastify: FastifyInstance, opts: { uri: string }, next) => {
  await Mongoose.connect(opts.uri);

  const models: Models = {
    Survey: Survey,
  };

  fastify.decorate('db', { models });

  next();
});
