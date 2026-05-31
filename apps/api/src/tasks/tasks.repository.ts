import { TaskModel } from './tasks.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '@kanban/types';

export class TasksRepository {
  private mapToTask(doc: any): Task {
    return {
      id: doc._id,
      title: doc.title,
      description: doc.description,
      status: doc.status,
      boardId: doc.boardId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findAll(
    page: number = 1,
    limit: number = 20,
    filters?: { boardId?: string; status?: TaskStatus }
  ): Promise<{ tasks: Task[]; total: number }> {
    const query: any = {};
    if (filters?.boardId) {
      query.boardId = filters.boardId;
    }
    if (filters?.status) {
      query.status = filters.status;
    }

    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      TaskModel.find(query).skip(skip).limit(limit).exec(),
      TaskModel.countDocuments(query).exec(),
    ]);

    return {
      tasks: docs.map((doc) => this.mapToTask(doc)),
      total,
    };
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await TaskModel.findById(id).exec();
    return doc ? this.mapToTask(doc) : null;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const doc = await TaskModel.create({
      _id: uuidv4(),
      title: dto.title,
      description: dto.description || '',
      status: dto.status || TaskStatus.TODO,
      boardId: dto.boardId,
    });
    return this.mapToTask(doc);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task | null> {
    const doc = await TaskModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    return doc ? this.mapToTask(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
