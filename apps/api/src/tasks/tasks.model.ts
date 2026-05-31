import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { TaskStatus } from '@kanban/types';

@modelOptions({
  options: { allowMixed: Severity.ERROR },
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class TaskClass {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public title!: string;

  @prop({ default: '' })
  public description!: string;

  @prop({ required: true, enum: TaskStatus, default: TaskStatus.TODO })
  public status!: TaskStatus;

  @prop({ required: true })
  public boardId!: string;

  public get id(): string {
    return this._id;
  }
}

export const TaskModel = getModelForClass(TaskClass, {
  schemaOptions: { collection: 'tasks' },
});
