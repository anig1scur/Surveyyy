import mongoose, { Document, Schema } from 'mongoose';
import { Survey as SurveyType } from '../../../src/common/types';

export type SurveyDoc = Document & SurveyType;

export interface SurveyModel extends mongoose.Model<SurveyDoc> {
  build(attrs: SurveyType): SurveyDoc;
}

const SurveySchema = new mongoose.Schema({
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
    default: Date.now,
  },
  updatedAt: Date,
});

SurveySchema.pre('save', async function (next) {
  const now = new Date();
  this.updatedAt = now;
  next();
});

SurveySchema.static('build', function (attrs: SurveyType) {
  return new Survey(attrs);
});

export const Survey: mongoose.Model<SurveyModel> = mongoose.model<SurveyModel>('Survey', SurveySchema, 'survey');
