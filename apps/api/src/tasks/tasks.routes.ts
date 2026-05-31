import { Router } from 'express';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { validateDto } from '../middleware/validateDto';
import { authenticate } from '../middleware/authenticate';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

const router: Router = Router();
const controller = new TasksController(new TasksService(new TasksRepository()));

router.get('/', authenticate, controller.getAll.bind(controller));
router.get('/:id', authenticate, controller.getOne.bind(controller));
router.post('/', authenticate, validateDto(CreateTaskDto), controller.create.bind(controller));
router.put('/:id', authenticate, validateDto(UpdateTaskDto), controller.update.bind(controller));
router.delete('/:id', authenticate, controller.delete.bind(controller));

export default router;
