import express from 'express';
import { signup, signin, googleSignIn } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/googleSignIn', googleSignIn);

export default router;