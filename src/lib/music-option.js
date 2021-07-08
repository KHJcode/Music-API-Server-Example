import { Op } from 'sequelize';

const MUSIC_PAGE_POINT = 15;

export const FIND_ONE_MUSIC_OPTION = {
  attributes: { exclude: ['updatedAt'] },
};

export const FIND_ALL_MUSIC_OPTION = (page) => ({
  offset: (page - 1) * MUSIC_PAGE_POINT,
  limit: page * MUSIC_PAGE_POINT,
  ...FIND_ONE_MUSIC_OPTION,
});

export const FIND_MUSIC_WHERE_OPTION = (word = 0, category = 0) => (
  word ? {
    [Op.or]: [
      {
        name: { [Op.like]: `%${word}%` },
      },
      {
        creater: { [Op.like]: `%${word}%` },
      },
    ],
  } : category ? { category } : {}
);
