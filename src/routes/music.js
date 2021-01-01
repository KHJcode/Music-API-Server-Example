import express from 'express';
import { Music } from '../models';

import { adminCheck } from '../middleware/admin';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Music Router!');
  } catch (err) {
    next(err);
  }
});

router.post('/create', adminCheck, async (req, res, next) => {
  try {
    const { name, file, creater } = req.body;
    await Music
      .create({ name, file, creater })
      .then(result => {
        console.log(result);
        res.status(201).json(result ? 'success' : 'error');
      });
  } catch (err) {
    next(err);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
});

export default router;
