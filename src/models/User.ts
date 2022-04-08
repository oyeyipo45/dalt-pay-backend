import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from 'config';

/** @ts-ignore - This allow the the typescript compiler to ignore untyped JS modules/libraries */

//@ts-ignore
import mongoosedbErrorHandler from 'mongoose-mongodb-errors';

export type UserDocument = mongoose.Document & {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  token: any;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      lowercase: true,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      lowercase: true,
    },
    resetPasswordExpires: Date,
    token: {
      type: String,
      lowercase: true,
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

userSchema.plugin(mongoosedbErrorHandler);

const JSONMap = new Map([
  ['_id', 'id'],
  ['email', 'email'],
//   ['createdAt', 'createdAt'],
]);

interface Clean {
    value: string,
    key: any
}

// Schema methods
// userSchema.methods.asJSON = function () {
//     const clean = <Clean>{}

//   JSONMap.forEach((value : string, key : any) => {
//     clean[value] = this[key];
//   });

//   return clean;
// };


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
