import {Router} from 'express';
import controller from '../controllers/comando.controller';

const router = Router();

router.get('/comando/test',controller.test);
router.get('/comando/list',controller.list);
router.get('/comando/list/:tipo',controller.listByTipo);
router.get('/comando/listTipo',controller.listTipo);
router.post('/comando/create',controller.create);
router.put('/comando/edit/:id',controller.edit);
router.delete('/comando/delete/:id',controller.delete);

export default router;