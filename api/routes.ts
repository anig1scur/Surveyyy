import type { FastifyReply, FastifyRequest } from 'fastify';
import { MongoClient } from 'mongodb';
import { SurveyMock } from '../src/common/mock';
import { Survey } from '../service/models/Survey';
const CONNECTION_STRING = process.env.MONGODB_URI || '';

export default async function routes(fastify, options) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });

  fastify.get('/hi', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hi: 'hello' };
  });

  fastify.get('/db', async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = await client.db('air');
    var result = await db.collection('survey').find().toArray();
    return { rs: result };
  });

  fastify.get('/createP', async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = await client.db('air');
    var result = await db.collection('survey').insertOne(SurveyMock);
    return result;
  });
}
