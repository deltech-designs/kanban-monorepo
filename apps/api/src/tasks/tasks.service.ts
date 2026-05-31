import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task, TaskStatus } from '@kanban/types';

export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findAll(
    page: number,
    limit: number,
    filters?: { boardId?: string; status?: TaskStatus }
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.tasksRepository.findAll(page, limit, filters);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasksRepository.findById(id);
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create(dto);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task | null> {
    return this.tasksRepository.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    return this.tasksRepository.delete(id);
  }
}
