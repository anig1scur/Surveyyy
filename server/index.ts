import { join, dirname } from 'node:path';

import fastify from 'fastify';
import autoload from '@fastify/autoload';
import helmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import blipp from 'fastify-blipp';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';

import services from './services';
import controllers from './controllers';

const build = (opts: FastifyServerOptions = {}) => {
  const f: FastifyInstance = fastify(opts);

  f.register(helmet);

  f.register(fastifyCors, {
    exposedHeaders: ['Content-Range'],
  });

  f.register(blipp);

  f.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });

  f.register(services);

  f.register(controllers);

  f.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return f;
};

export default build;
