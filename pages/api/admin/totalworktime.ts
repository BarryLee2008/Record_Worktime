import { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from 'db/data-source';
import { User } from 'db/entities/index';
import { Between } from 'typeorm';
import { format } from 'date-fns';
import { verifyJWT } from 'util/jwt';
const totalWorktime = async (req: NextApiRequest, res: NextApiResponse) => {
  let token: string | undefined = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'The token missed',
    });
  }
  token = token.split('Bearer ')[1];
  let decode = null;
  //decode = await verifyJWT(token);
   try {
     decode = await verifyJWT(token)
  } catch (error: any) {
    return res.status(401).json({
      message:error?.message || 'invalid token'
    })
  }
  let userInfo = null;
  if (typeof decode === 'object') {
    userInfo = decode?.data;
  } else if (typeof decode === 'string') {
    userInfo = JSON.parse(decode)?.data;
  }
  const userID = Number(userInfo?.id) ;
  if (userID > 20) {
    return res.status(403).json({
      message: 'You are not allowed to access these resources',
    });
  }

  const { period = 10 } = req.body;
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const userRepo = AppDataSource.getRepository(User);
  let end_time = format(new Date(), 'yy-MM-dd');
  let start_time = format(
    new Date().getTime() - 1000 * 60 * 60 * 24 * period,
    'yyyy-MM-dd'
  );
  console.log(`${start_time} 00:00:00`);
  const allUsers = await userRepo.find({
    relations: {
      tasks: true,
    },
    where: {
      tasks: {
        start_time: Between(`${start_time} 00:00:00`, `${end_time} 23:59:59`),
      },
    },
  });
  console.log(allUsers);

  res.status(200).json({
    message: 'Ok',
    data: allUsers,
  });
};

export default totalWorktime;
