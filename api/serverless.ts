import type { FastifyReply, FastifyRequest } from 'fastify';
import * as dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

app.register(import('./routes'), { prefix: 'api/' });

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.ready();
  app.server.emit('request', req, res);
};
