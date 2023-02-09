import { Survey } from '../../src/common/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { Prisma, PrismaClient } from '@prisma/client';

export class SurveyService {
  constructor(private survey: PrismaClient['survey']) {}

  getSurveyById = (surveyId: string, opts: Omit<Prisma.SurveyFindUniqueArgs, 'where'> = {}) =>
    this.survey.findUnique({ where: { id: surveyId }, ...opts });

  updateSurveyById = (surveyId: string, opts: Omit<Prisma.SurveyUpdateArgs, 'where'>) =>
    this.survey.update({ where: { id: surveyId }, ...opts });

  querySurveys = (args?: Prisma.SurveyFindManyArgs) => {
    return this.survey.findMany(args);
  };

  createSurvey = async ({ ...props }: Survey) => {
    try {
      return await this.survey.create({
        // @ts-ignore
        data: { ...props },
        select: {
          id: true,
          title: true,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  deleteSurveyById = async (id: string) => {
    try {
      return await this.survey.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return null;
        }
      }

      throw e;
    }
  };
}

export default SurveyService;
