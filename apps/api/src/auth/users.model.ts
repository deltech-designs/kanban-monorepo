import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ERROR },
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class UserClass {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true, unique: true, lowercase: true, index: true })
  public email!: string;

  @prop({ required: true })
  public name!: string;

  @prop()
  public password?: string;

  @prop()
  public avatar?: string;

  @prop({ unique: true, sparse: true, index: true })
  public googleId?: string;

  @prop()
  public otpCode?: string;

  @prop()
  public otpExpiresAt?: Date;

  @prop({ default: false })
  public isVerified!: boolean;

  @prop()
  public resetToken?: string;

  @prop()
  public resetTokenExpiresAt?: Date;

  public get id(): string {
    return this._id;
  }
}

export const UserModel = getModelForClass(UserClass, {
  schemaOptions: { collection: 'users' },
});
