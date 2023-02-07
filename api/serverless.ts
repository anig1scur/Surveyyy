import build from '../server/index';
import { FastifyReply, FastifyRequest } from 'fastify';
import { fastifyConfig } from '../server/config';

const f = build(fastifyConfig);

process.on('uncaughtException', (error) => {
  console.error(error);
});
process.on('unhandledRejection', (error) => {
  console.error(error);
});

export default async (req: FastifyRequest, res: FastifyReply) => {
  console.log(`routes ${f.printRoutes()}`);
  await f.ready();
  f.server.emit('request', req, res);
};
