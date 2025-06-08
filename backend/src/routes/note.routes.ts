import { Router, RequestHandler } from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes
} from '../controllers/note.controller';

const router = Router();

router.post('/', createNote as RequestHandler);
router.get('/', getNotes as RequestHandler);
router.get('/search', searchNotes as RequestHandler);
router.get('/:id', getNoteById as RequestHandler);
router.put('/:id', updateNote as RequestHandler);
router.delete('/:id', deleteNote as RequestHandler);

export default router;