import fp from 'fastify-plugin'

import { AuthController } from './auth.controller'
import { UserController } from './user.controller'
import { SurveyController } from './survey.controller'

declare module 'fastify' {
  interface FastifyInstance {
    controllers: {
      auth: AuthController
      user: UserController
      survet: SurveyController
    }
  }
}

export default fp(async (f) => {
  const { user, session, token, mail, survey } = f.services

  f.decorate('controllers', {
    auth: new AuthController(user, session, token, mail),
    user: new UserController(user),
    survey: new SurveyController(survey)
  })
})
