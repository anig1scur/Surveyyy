import { fastifyPlugin as fp } from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default fp(async (server: FastifyInstance, opts: FastifyPluginOptions, next: () => void) => {
  server.route({
    url: '/error-thrower',
    method: ['GET'],
    handler: async (request, reply) => {
      // throw new Error('Oh no, something bad happened, try to debug me');
      return reply.send({ date: new Date(), works: true });
    },
  });
  next();
});
