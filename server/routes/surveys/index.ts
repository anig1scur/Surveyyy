import type { FastifyPluginAsync } from 'fastify';

import surveySchema from '../../validations/survey.schema';

const routes: FastifyPluginAsync = async (f) => {
  const { survey } = f.controllers;
  f.addSchema(surveySchema.schema);

  f.route({
    method: 'GET',
    url: '/',
    schema: surveySchema.list,
    handler: survey.list,
  });

  // get one survey
  f.route({
    method: 'GET',
    url: '/:surveyId',
    schema: surveySchema.get,
    handler: survey.get,
  });

  f.route({
    method: 'POST',
    url: '/',
    schema: surveySchema.create,
    handler: survey.create,
  });

  f.route({
    method: 'PUT',
    url: '/:surveyId',
    schema: surveySchema.put,
    handler: survey.put,
  });

  f.route({
    method: 'DELETE',
    url: '/:surveyId',
    handler: survey.delete,
  });
};

export default routes;
