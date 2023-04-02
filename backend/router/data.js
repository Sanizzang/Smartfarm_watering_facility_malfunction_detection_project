import express from 'express';
import 'express-async-errors';
import * as dataController from '../controller/data.js';

const router = express.Router();

// GET /data
router.get('/', dataController.getData);

// POST /data
router.post('/', dataController.updateData);

export default router;