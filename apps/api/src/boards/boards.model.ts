import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ERROR },
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class BoardClass {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ default: '' })
  public description!: string;

  @prop({ required: true })
  public workspaceId!: string;

  @prop({ required: true })
  public userId!: string;

  public get id(): string {
    return this._id;
  }
}

export const BoardModel = getModelForClass(BoardClass, {
  schemaOptions: { collection: 'boards' },
});
