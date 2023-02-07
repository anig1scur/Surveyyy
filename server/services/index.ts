import fp from 'fastify-plugin'

import { SessionService } from './session.service'
import { TokenService } from './token.service'
import { UserService } from './user.service'
import { MailService } from './mail.service'

export type { UserService, SessionService, TokenService, MailService }

declare module 'fastify' {
  interface FastifyInstance {
    services: {
      mail: MailService
      session: SessionService
      token: TokenService
      user: UserService
    }
  }
}

export default fp(async (f) => {
  f.decorate('services', {
    mail: new MailService(f.mailer),
    session: new SessionService(f.prisma.session),
    token: new TokenService(f.jwt),
    user: new UserService(f.prisma.user)
  })
})
