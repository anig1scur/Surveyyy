import mongoose, { Schema } from 'mongoose';
import { Collection as CollectionType } from '../../src/common/types';

export type CollectionDocument = CollectionType & Document;

interface CollectionModel extends mongoose.Model<CollectionDocument> {
  build(attrs: CollectionType): CollectionDocument;
}

const sectionSchema = new mongoose.Schema({
  surveyId: {
    type: String,
    required: true,
  },
  answers: {
    type: Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

sectionSchema.static('build', function (attrs: CollectionType) {
  return new Collection(attrs);
});

const Collection = mongoose.model<CollectionDocument, CollectionModel>('Collection', sectionSchema);

export { Collection };
