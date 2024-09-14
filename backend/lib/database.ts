import pg from 'pg';
import { Sequelize } from 'sequelize';

export const connection = new Sequelize({
  dialectModule: pg,
  dialect: 'postgres',
  database: 'defaultdb',
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  host: process.env.DB_HOST ?? '',
  port: +(process.env.DB_PORT ?? '5432'),
  sync: {
    alter: true,
    force: true,
    logging: true,
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.DB_CA ?? '',
    },
  },
});
