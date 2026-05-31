import { BoardModel } from './boards.model';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '@kanban/types';

export class BoardsRepository {
  private mapToBoard(doc: any): Board {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      workspaceId: doc.workspaceId,
      userId: doc.userId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findAll(page: number = 1, limit: number = 20): Promise<{ boards: Board[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      BoardModel.find().skip(skip).limit(limit).exec(),
      BoardModel.countDocuments().exec(),
    ]);

    return {
      boards: docs.map((doc) => this.mapToBoard(doc)),
      total,
    };
  }

  async findById(id: string): Promise<Board | null> {
    const doc = await BoardModel.findById(id).exec();
    return doc ? this.mapToBoard(doc) : null;
  }

  async create(dto: CreateBoardDto & { userId: string }): Promise<Board> {
    const doc = await BoardModel.create({
      _id: uuidv4(),
      name: dto.name,
      description: dto.description || '',
      workspaceId: dto.workspaceId,
      userId: dto.userId,
    });
    return this.mapToBoard(doc);
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board | null> {
    const doc = await BoardModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    return doc ? this.mapToBoard(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await BoardModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
