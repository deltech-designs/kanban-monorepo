// Domain entity types for the Kanban application

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  userId: string; // Creator
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[]; // User IDs
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateBoardInput = Omit<Board, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBoardInput = Partial<Omit<Board, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateWorkspaceInput = Omit<Workspace, 'id' | 'members' | 'createdAt' | 'updatedAt'>;
export type UpdateWorkspaceInput = Partial<Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>>;
