import type { FastifyReply, FastifyRequest } from 'fastify';

import { fastify, FastifyInstance } from 'fastify';
// const _importDynamic = new Function('modulePath', 'return import(modulePath)');

import fastifyBlipp from 'fastify-blipp';
import { Server, IncomingMessage, ServerResponse } from 'http';
import surveysRoutes from '../server/routes/surveys';
import errorThrowerRoutes from '../server/routes/error-thrower';
import db, { Db } from '../server/db';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db;
    blipp: () => void;
  }
}

const CONNECTION_STRING = process.env.MONGODB_URI || '';

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true });

// app.register(fastifyBlipp);

app.register(db, {
  uri: CONNECTION_STRING,
});
app.register(surveysRoutes);
// app.register(errorThrowerRoutes, { prefix: 'api/' });

process.on('uncaughtException', (error) => {
  console.error(error);
});
process.on('unhandledRejection', (error) => {
  console.error(error);
});

export default async (req: FastifyRequest, res: FastifyReply) => {
  // app.blipp();
  // const fastifyPrintRoutes = await _importDynamic('fastify-print-routes');
  // await app.register(fastifyPrintRoutes);
  console.log(`routes ${app.printRoutes()}`);
  await app.ready();
  app.server.emit('request', req, res);
};
