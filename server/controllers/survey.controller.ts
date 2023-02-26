import type { RouteHandler } from 'fastify';

import type { SurveyService } from '../services';
import { QuestionType, Survey } from '../..//src/common/types';

export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  generateId = (survey: Survey) => {
    // iterate survey sections and add generate id for every section
    survey.sections.forEach((section) => {
      section.id = section.id || Math.random().toString(36).slice(2, 10);
      if (section.type === QuestionType.fillInBlank || section.type === QuestionType.swiper) {
        // add id for each option
        section.options.forEach((option) => {
          if (option && option.type !== 'plain') {
            option.id = option.id || `${section.id}_${Math.random().toString(12).slice(2, 6)}`;
          }
        });
      }
    });
    return survey;
  };

  list: RouteHandler<{
    Reply: Array<Survey>;
  }> = async (req, rep) => {
    rep.header('X-Total-Count',  await this.surveyService.countSurveys());

    // TODO: FIXME
    // @ts-ignore
    rep.send(await this.surveyService.querySurveys());
  };

  create: RouteHandler<{
    Body: Survey;
  }> = async (req, rep) => {
    rep.send(
      await this.surveyService.createSurvey({
        ...this.generateId(req.body),
        authorId: '507f1f77bcf86cd799439011',
      })
    );
  };

  get: RouteHandler<{
    Params: { surveyId: string };
    Reply: Survey;
  }> = async (req, rep) => {
    const { surveyId } = req.params;
    rep.send(await this.surveyService.getSurveyById(surveyId));
  };

  put: RouteHandler<{
    Params: { surveyId: string };
    Body: Survey;
    Reply: Survey;
  }> = async (req, rep) => {
    const { surveyId } = req.params;
    rep.send(await this.surveyService.updateSurveyById(surveyId, this.generateId(req.body)));
  };

  delete: RouteHandler<{
    Params: { surveyId: string };
    Reply: undefined; // 204
  }> = async (req, rep) => {
    const { surveyId } = req.params;
    await this.surveyService.deleteSurveyById(surveyId);

    rep.code(204);
  };
}

export default SurveyController;
