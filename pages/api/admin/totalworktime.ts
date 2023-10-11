import { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from 'db/data-source';
import { User } from 'db/entities/index';
const totalWorktime = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const userRepo = AppDataSource.getRepository(User);
  const allUsers = await userRepo.find({
    relations: {
      tasks: true,
    },
  });
  console.log(allUsers);

  res.status(200).json({
    message: 'Ok',
    data: allUsers,
  });
};

export default totalWorktime;
