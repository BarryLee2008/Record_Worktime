import AppDataSource from 'db/data-source';
import { User } from 'db/entities';
import { NextApiRequest, NextApiResponse } from 'next';

const getUserInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  if (!id) {
    return res.status(401).json({
      message: 'The ID Missed',
    });
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const userRepo = AppDataSource.getRepository(User);

  const targetedUser = await userRepo.findOne({
    where: {
      id,
    },
    relations: {
      tasks: true,
    },
  });

  if (!targetedUser) {
    return res.status(401).json({
      message: 'The ID does not attach to any user',
    });
  }

  return res.status(200).json({
    message: 'Found the user',
    data: targetedUser,
  });
};

export default getUserInfo;
