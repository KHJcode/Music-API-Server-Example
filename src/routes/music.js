import express from 'express';
import { sequelize, Music } from '../models';
import {
  FIND_ALL_MUSIC_OPTION,
  FIND_MUSIC_WHERE_OPTION,
  FIND_ONE_MUSIC_OPTION
} from '../lib/music-option';

const router = express.Router();


router.get('/:id', async (req, res) => {
  const music = await Music.findOne({
    where: {
      id: req.params.id
    },
    ...FIND_ONE_MUSIC_OPTION,
  });

  res.status(200).json(music);
});

router.get('/', async (req, res, next) => {
  try {
    const { page } = req.query;
    const word = req.query?.word;
    const category = req.query?.category;
    const order = req.query?.order;
    const reverse = !!(req.query?.reverse);

    const music = await Music.findAll({
      order: [
        order === 'latest' ? 'id' :
          order === 'popularity' ? 'view' : null,
        reverse ? null : 'DESC',
      ],
      where: FIND_ALL_MUSIC_OPTION(word, category),
      ...FIND_ALL_MUSIC_OPTION(parseInt(page)),
    });

    res.status(200).json(music);
  } catch (err) {
    next(err);
  }
});

router.get('/count', async (req, res, next) => {
  try {
    const word = req.query?.word;
    const category = req.query?.category;

    const count = await Music.count(FIND_MUSIC_WHERE_OPTION(word, category));

    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
});

router.get('/view/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { view } = await Music.find({ id });
    
    res.status(200).json(view);
  } catch (err) {
    next(err);
  }
});

router.post('/view/:id', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    await Music
      .create(req.body)
      .then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const id = req.body?.id;

    if (id) {
      await Music
        .update(req.body, { where: { id } })
        .then(result => {
          res.status(201).json(result ? 'success' : 'error');
        });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await Music
      .destroy({ where: { id } })
      .then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
  } catch (err) {
    next(err);
  }
});


export default router;
