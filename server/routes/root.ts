import { FastifyPluginAsync } from 'fastify'

const routes: FastifyPluginAsync = async (f): Promise<void> => {
  f.route({
    method: 'GET',
    url: '/',
    handler: async () => 'hello surveyyy'
  })
}

export default routes
