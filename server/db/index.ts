import { Model } from 'mongoose';
import * as Mongoose from 'mongoose';
import { SurveyModel, Survey } from './models/Survey';
import { UserModel, User } from './models/User';

import { fastifyPlugin as fp } from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export interface Models {
  Survey: Model<SurveyModel>
  User: Model<UserModel>
}

export interface Db {
  models: Models;
}

Mongoose.set('strictQuery', false);

export default fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions, next: () => void) => {
  await Mongoose.connect(opts.uri).catch((err) => console.log(opts, err));
  const models: Models = {
    Survey: Survey,
    User: User
  };

  fastify.decorate('db', { models });

  next();
});
