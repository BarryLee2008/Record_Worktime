import AppDataSource from 'db/data-source';
import { User } from 'db/entities';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJWT } from 'util/jwt';
//import { Between } from 'typeorm';
import { format } from 'date-fns';
const getUserInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  let token: string | undefined = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'The Token Missed',
    });
  }
  token = token.split('Bearer ')[1];
  let userID = null;

  try {
    const decode = await verifyJWT(token)
    if (typeof decode === 'object') {
      userID = decode?.data?.id;
    } else if (typeof decode === 'string') {
      userID = JSON.parse(decode)?.data?.id;
    }
  } catch (error:any) {
    return res.status(401).json({
      message:error?.message || 'invalid token'
    })
  }
  //const decode = await verifyJWT(token);
  
  if (!userID) {
    return res.status(401).json({
      message: 'The ID Missed',
    });
  }
 /*  if (userID != 3 && userID != 4) {
    return res.status(403).json({
      message: 'You are not allowed to access these resource',
    });
  } */
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const userRepo = AppDataSource.getRepository(User);

  const {period = 10} = req.body
  const start_time = format((new Date().getTime() - 1000 * 60 * 60 * 24 * period),'yyyy-MM-dd') + ' 00:00:00'
  const end_time = format(new Date(), 'yyyy-MM-dd') + ' 23:59:59'
  //const start_time = '2023-10-01 00:00:00'
  //const end_time = '2023-10-05 23:59:59'
 console.log(userID)
  console.log(start_time)
/*   const targetedUser = await userRepo.findOne({
    relations:{
      tasks:true
    },
    where:{
      id:userID,
      tasks:{
        start_time: Between(`${start_time} 00:00:00`,`${end_time} 23:59:59`)
        
      }
    }
  }); */
  const targetedUser = await userRepo
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.tasks", "task", "task.start_time BETWEEN :start_time AND :end_time", {
    start_time,
    end_time,
  })
  .where("user.id = :userID", { userID })
  .getOne();
//console.log(targetedUser)

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
