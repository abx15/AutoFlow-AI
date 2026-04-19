import express from 'express';
import { dataExportController } from './data-export.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/request', dataExportController.request);
router.get('/status/:id', dataExportController.getStatus);
router.post('/delete-account', dataExportController.deleteAccount);

export default router;
