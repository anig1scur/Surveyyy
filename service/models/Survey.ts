import mongoose, { Document, Schema } from 'mongoose';
import { Survey as SurveyType } from '../../src/common/types';

export type SurveyDocument = Document & SurveyType;

export interface SurveyModel extends mongoose.Model<SurveyDocument> {
  build(attrs: SurveyType): SurveyDocument;
}

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  sections: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

surveySchema.pre('save', async function () {
  this.createdAt = new Date();
});

surveySchema.static('build', function (attrs: SurveyType) {
  return new Survey(attrs);
});

const Survey = mongoose.model<SurveyDocument, SurveyModel>('Survey', surveySchema);

export { Survey };
