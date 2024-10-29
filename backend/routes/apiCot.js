import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(verifyToken);

// COT specific endpoints
router.get('/status', (req, res) => {
  res.json({ status: 'operational' });
});

router.get('/metrics', (req, res) => {
  res.json({
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

export default router;