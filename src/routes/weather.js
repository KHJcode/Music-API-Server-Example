import express from 'express';
import getCoordinates from '../script/getCoord';
import webParsing from '../script/parsing';
import { weatherUserIdCheck } from '../middleware/admin';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Weather Router!');
  } catch (err) {
    next(err);
  }
});

router.get('/get/:mode/:id/:v1/:v2', weatherUserIdCheck, async (req, res, next) => {
  try {
    const { v1, v2, mode } = req.params;
    const rs = getCoordinates('toXY', v1, v2);
    const url = `https://www.weather.go.kr/weather/forecast/digital_forecast.jsp?x=${rs.x}&y=${rs.y}&unit=K`;

    await webParsing(url, mode)
      .then(data => {
        res.status(200).json(data);
      }, error => {
          console.log(error);
          return res.status(404).json('Not found.');
      });

  } catch (err) {
    next(err);
  }
});

export default router;
