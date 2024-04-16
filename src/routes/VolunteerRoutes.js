// volunteerRoutes.mjs

import express from 'express';
import { getVolunteers, createVolunteers } from '../controllers/Volunteer.js';

const router = express.Router();

router.get('/Volunteers', getVolunteers);
router.post('/Volunteers', createVolunteers);

export default router;
