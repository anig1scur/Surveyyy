import type { FastifyInstance, FastifyReply, FastifyRequest, FastifyPluginOptions } from 'fastify';
import { fastifyPlugin as fp } from 'fastify-plugin';

export default fp(async (server: FastifyInstance, opts: FastifyPluginOptions, next: () => void) => {
  server.get('/surveys/:id', {}, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // @ts-ignore
      const _id = request.params.id;

      const survey = await server.db.models.Survey.findOne({
        _id: _id,
      });

      if (!survey) {
        return reply.send(404);
      }

      return reply.code(200).send(survey);
    } catch (error) {
      request.log.error(error);
      return reply.send(400);
    }
  });

  server.post('/surveys', {}, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { Survey } = server.db.models;
      const survey = await Survey.create(request.body);
      return reply.code(201).send(survey);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });
  next();
});
