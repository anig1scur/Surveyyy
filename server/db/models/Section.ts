import mongoose from 'mongoose';
import { S } from '../../../src/common/types';

export type SectionDocument = S & Document;

interface SectionModel extends mongoose.Model<SectionDocument> {
  build(attrs: S): SectionDocument;
}

const sectionSchema = new mongoose.Schema({}, { strict: false });

sectionSchema.static('build', function (attrs: S) {
  return new Section(attrs);
});

const Section = mongoose.model<SectionDocument, SectionModel>('Section', sectionSchema);

export { Section };
