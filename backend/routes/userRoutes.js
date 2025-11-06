import express from 'express';
import { getProfile, updateProfile, checkUsername } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/:auth0Id', getProfile);
router.post('/profile', updateProfile);
router.get('/check-username/:username', checkUsername);

export default router;