import { Router } from 'express';
import { 
  setupCreateDenunciaController,
  setupGetByIdDenunciaController,
  setupUpdateDenunciaController,
  setupDeleteDenunciaController
} from '../useCase';

export function createDenunciaRoutes(): Router {
  const router = Router();

  // Configurar os controllers
  const createController = setupCreateDenunciaController();
  const getByIdController = setupGetByIdDenunciaController();
  const updateController = setupUpdateDenunciaController();
  const deleteController = setupDeleteDenunciaController();

  // Definir as rotas CRUD
  router.post('/', (req, res) => createController.handle(req, res));
  router.get('/:id', (req, res) => getByIdController.handle(req, res));
  router.put('/:id', (req, res) => updateController.handle(req, res));
  router.delete('/:id', (req, res) => deleteController.handle(req, res));

  return router;
}