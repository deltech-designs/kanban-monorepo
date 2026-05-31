import { Router } from 'express';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { validateDto } from '../middleware/validateDto';
import { authenticate } from '../middleware/authenticate';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';

const router: Router = Router();
const controller = new BoardsController(new BoardsService(new BoardsRepository()));

router.get('/', authenticate, controller.getAll.bind(controller));
router.get('/:id', authenticate, controller.getOne.bind(controller));
router.post('/', authenticate, validateDto(CreateBoardDto), controller.create.bind(controller));
router.put('/:id', authenticate, validateDto(UpdateBoardDto), controller.update.bind(controller));
router.delete('/:id', authenticate, controller.delete.bind(controller));

export default router;
