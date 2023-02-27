import type { FastifyPluginAsync } from 'fastify';

import collectionSchema from '../../validations/collection.schema';

const routes: FastifyPluginAsync = async (f) => {
  const { collection } = f.controllers;
  f.addSchema(collectionSchema.schema);

  f.route({
    method: 'GET',
    url: '/',
    schema: collectionSchema.list,
    handler: collection.list,
  });

  // get one collection
  f.route({
    method: 'GET',
    url: '/:collectionId',
    schema: collectionSchema.get,
    handler: collection.get,
  });

  f.route({
    method: 'POST',
    url: '/',
    schema: collectionSchema.create,
    handler: collection.create,
  });

  f.route({
    method: 'DELETE',
    url: '/:collectionId',
    handler: collection.delete,
  });
};

export default routes;
