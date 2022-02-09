import express from 'express';

import { addBook, detailsBook } from '../controllers/book';

const router = express.Router();

router.post('/', addBook);
router.get('/:id', detailsBook);

export default router;
