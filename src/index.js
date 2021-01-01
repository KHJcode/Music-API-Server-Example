import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { sequelize } from './models';
import musicRouter from './routes/music';
import weatherRouter from './routes/weather';


dotenv.config();

const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : '6060');

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('DB connected!');
  })
  .catch(err => {
    console.error(err);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(cors());
}

app.use(morgan(prod ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/music', musicRouter);
app.use('/weather', weatherRouter);

app.get('*', (err, res, req, next) => {
  console.log(err);
  res.status(500).json('error');
});

app.get('/', (req, res, next) => {
  res.status(200).json('server is test.');
});

app.listen(app.get('port'), () => {
  console.log(`Server is started on ${app.get('port')}.`);
});
