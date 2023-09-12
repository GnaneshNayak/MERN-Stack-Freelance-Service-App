import express from 'express';
import {
  createGig,
  getGigs,
  deleteGig,
  getSingleGig,
} from '../controllers/gig.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.get('/', getGigs);
router.post('/create', verifyToken, createGig);
router.delete('/delete/:id', verifyToken, deleteGig);
router.get('/single/:id', getSingleGig);

export default router;
