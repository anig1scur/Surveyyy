import type { RouteHandler } from 'fastify';

import type { SurveyService } from '../services';
import { Survey } from '../..//src/common/types';

export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  list: RouteHandler<{
    Reply: Array<Survey>;
  }> = async (req, rep) => {
    // TODO: FIXME
    // @ts-ignore
    rep.send(await this.surveyService.querySurveys());
  };

  create: RouteHandler<{
    Body: Survey;
  }> = async (req, rep) => {
    rep.send(await this.surveyService.createSurvey(req.body));
  };
}

export default SurveyController;
