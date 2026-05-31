import { BoardModel } from '../boards/boards.model';
import { TaskModel } from '../tasks/tasks.model';
import { TaskStatus } from '@kanban/types';

export async function seedDatabase(): Promise<void> {
  try {
    const boardCount = await BoardModel.countDocuments();
    if (boardCount > 0) {
      console.log('🌱 Database already has data. Skipping seed.');
      return;
    }

    console.log('🌱 Seeding default board and tasks...');

    const boardId = 'default-board-uuid';

    await BoardModel.create({
      _id: boardId,
      name: 'Product Development Board',
      description: 'Track our product development sprint tasks and milestones.',
      workspaceId: 'default-workspace-uuid',
      userId: 'default-user-uuid',
    });

    await TaskModel.create([
      {
        _id: 'task-1',
        title: 'Design high-fidelity mockups',
        description: 'Create premium, gorgeous Figma UI layouts for the main dashboard views.',
        status: TaskStatus.TODO,
        boardId,
      },
      {
        _id: 'task-2',
        title: 'Integrate Google authentication',
        description: 'Setup OAuth2 provider in backend and link avatars on the UI sidebar.',
        status: TaskStatus.IN_PROGRESS,
        boardId,
      },
      {
        _id: 'task-3',
        title: 'Setup Typegoose backend database',
        description: 'Migrate mock in-memory controllers to Typegoose database repositories.',
        status: TaskStatus.DONE,
        boardId,
      },
    ]);

    console.log('🌱 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
  }
}
