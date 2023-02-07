import mongoose, { Document } from 'mongoose';
import { Password } from '../../utils/password';
import { User as UserType } from '../../../src/common/types';

// describes the properties that a User Document has: solves issue 2
export type UserDoc = Document & UserType;

//describes the properties that a User Model has: issue 1
// UserModel interface extends mongoose.Model, and represents a collection of UserDocs
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserType): UserDoc; // return value of build method must be type UserDoc
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    refreshTokensId: {
      type: mongoose.Types.ObjectId,
      ref: 'RefreshTokens',
    },
  },
  // second argument: options object of type mongoose.SchemaOptions
  {
    // toJSON object
    toJSON: {
      // when we call res.send(obj), express calls JSON.stringify(obj)
      // stringify's usual behavior is overridden by transform function below (like toJSON)
      // transform function applies to the document before returning
      // doc is the actual user document instance, and ret is the obj. representation
      // that we will mutate. ret is implicitly returned, converted to json.
      transform(doc: Document, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// runs every time we call user.save(), hashing the inputted plain-text password
// within, 'this' refers to document being saved
userSchema.pre('save', async function (done) {
  // checking to see if password field has been modified. may not be if user is changing email
  // so we wouldn't want to hash an already hashed password
  // on registration, password will be considered modified
  if (this.isModified('password')) {
    // construct hash
    const hashed = await Password.toHash(this.get('password'));
    // set password field as hashed value
    this.set('password', hashed);
  }
  done();
});


// to create new user, call User.build(..) instead of default constructor new User(..)
// allows TS to check the argument, as mongoose prevents TS from doing so
// Must add build method to UserModel interface for TS to recognize it
userSchema.static('build', function (attrs: UserType) {
  return new User(attrs);
});

// mongoose creates a model out of schema. model is the CRUD interface to reach MongoDB
// we give model constructor template vars UserDoc and UserModel, it returns type UserModel, which represents a collection of UserDocs
// const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export const User: mongoose.Model<UserModel> = mongoose.model<UserModel>('User', userSchema, 'user');
