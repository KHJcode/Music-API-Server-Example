import express from 'express';
import { Op } from 'sequelize';
import { sequelize, Music } from '../models';
import { lengthStdCheck } from '../middleware/length';
import { adminCheck } from '../middleware/admin';

const router = express.Router();
const length_std = 15;


router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Music Router!');
  } catch (err) {
    next(err);
  }
});

router.get('/count/all', async (req, res, next) => {
  try {
    const data = await Music.count({});

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/list/:n', lengthStdCheck, async (req, res, next) => {
  try {
    const { n } = req.params;

    const data = await Music.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['id', 'DESC']],
      offset: (n - 1) * length_std,
      limit: n * length_std,
    });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/count/search/:keyword', async (req, res, next) => {
  try {
    const { keyword } = req.params;

    const data = await Music.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: '%' + keyword + '%',
            },
          },
          {
            creater: {
              [Op.like]: '%' + keyword + '%',
            },
          },
        ],
      },
    });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/search/:keyword/:n', lengthStdCheck, async (req, res, next) => {
  try {
    const { keyword, n } = req.params;

    const data = await Music.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: '%' + keyword + '%',
            },
          },
          {
            creater: {
              [Op.like]: '%' + keyword + '%',
            },
          },
        ],
      },
      order: [['name', 'DESC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      offset: (n - 1) * length_std,
      limit: n * length_std,
    });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/popular/:n', lengthStdCheck, async (req, res, next) => {
  try {
    const n = parseInt(req.params.n);

    const data = await Music.findAll({
      order: [['view', 'DESC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      offset: n - 1,
      limit: n,
    });

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/view/:id', adminCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await sequelize
      .query(`update music set view = view + 1 where id = ${id}`)
      .then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
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
        res.status(201).json(result ? 'success' : 'error');
      });
  } catch (err) {
    next(err);
  }
});

router.post('/update', adminCheck, async (req, res, next) => {
  try {
    const { id, name, file, creater } = req.body;
    
    await Music
      .update({ name, file, creater }, { where: { id }})
      .then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
  } catch (err) {
    next(err);
  }
});

export default router;
