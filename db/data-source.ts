import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task, Account, User } from 'db/entities/index';
const AppDataSource = new DataSource({
  type: 'mysql',
  host: '47.245.105.51',
  port: 3306,
  username: 'root',
  password: 'Ab2132208#',
  database: 'Record_Worktime',
  synchronize: true,
  logging: false,
  entities: [Task, Account, User],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
