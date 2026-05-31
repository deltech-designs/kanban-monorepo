import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { Board } from '@kanban/types';

export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async findAll(page: number, limit: number): Promise<{ boards: Board[]; total: number }> {
    return this.boardsRepository.findAll(page, limit);
  }

  async findById(id: string): Promise<Board | null> {
    return this.boardsRepository.findById(id);
  }

  async create(dto: CreateBoardDto, userId: string): Promise<Board> {
    const creatorId = dto.userId || userId;
    return this.boardsRepository.create({ ...dto, userId: creatorId });
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board | null> {
    return this.boardsRepository.update(id, dto);
  }

  async delete(id: string): Promise<boolean> {
    return this.boardsRepository.delete(id);
  }
}
