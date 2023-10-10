import { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from 'db/data-source';
import { Task, User } from 'db/entities/index';
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
  console.log(response);

  res.status(200).json({
    message: 'Ok',
    data: response,
  });
};

export default totalWorktime;
