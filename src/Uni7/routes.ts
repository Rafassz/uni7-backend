import { Router } from 'express';
import { createDenunciaRoutes } from './denuncia';

export function createAppRouter(): Router {
  const router = Router();

  // Registrar rotas da denúncia
  router.use('/denuncias', createDenunciaRoutes());

  return router;
}