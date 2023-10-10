import { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from 'db/data-source';
import { Task, User } from 'db/entities/index';
import { App } from 'antd';
const totalWorktime = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const userRepo = AppDataSource.getRepository(User);
  const response = await userRepo.findOne({
    where: {
      id: 3,
    },
    relations: {
      tasks: true,
    },
  });
  const currentTask = await AppDataSource.getRepository(Task).findOne({
    where: {
      id: 50,
    },
    relations: {
      user: true,
    },
  });
  console.log(currentTask);

  res.status(200).json({
    message: 'Ok',
    data: currentTask,
  });
};

export default totalWorktime;
