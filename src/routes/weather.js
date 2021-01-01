import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Weather Router!');
  } catch (err) {
    next(err);
  }
});

export default router;
