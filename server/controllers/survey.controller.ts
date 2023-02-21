import type { RouteHandler } from 'fastify';

import type { SurveyService } from '../services';
import { Survey } from '../..//src/common/types';

export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  list: RouteHandler<{
    Reply: Array<Survey>;
  }> = async (req, rep) => {
    rep.header('X-Total-Count', await this.surveyService.countSurveys());

    // TODO: FIXME
    // @ts-ignore
    rep.send(await this.surveyService.querySurveys());
  };

  create: RouteHandler<{
    Body: Survey;
  }> = async (req, rep) => {
    rep.send(await this.surveyService.createSurvey(req.body));
  };

  get: RouteHandler<{
    Params: { surveyId: string };
    Reply: Survey;
  }> = async (req, rep) => {
    const { surveyId } = req.params;
    rep.send(await this.surveyService.getSurveyById(surveyId));
  }

  put: RouteHandler<{
    Params: { surveyId: string };
    Body: Survey;
    Reply: Survey;
  }> = async (req, rep) => {
    const { surveyId } = req.params;

    rep.send(
      await this.surveyService.updateSurveyById(surveyId, req.body),
    );
  }

  delete: RouteHandler<{
    Params: { surveyId: string };
    Reply: undefined; // 204
  }> = async (req, rep) => {
    const { surveyId } = req.params;
    await this.surveyService.deleteSurveyById(surveyId);

    rep.code(204);
  }

}

export default SurveyController;
