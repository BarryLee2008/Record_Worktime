import { NextApiRequest, NextApiResponse } from 'next';

import AppDataSource from 'db/data-source';

import { Account} from 'db/entities/index';

import { verifyJWT } from 'util/jwt';
import { encryption } from 'util/md5';


const userInfoChange = async (req: NextApiRequest, res: NextApiResponse) => {
  let token: string | undefined = req.headers.authorization;
  let {newPassword = undefined} = req.body 
  if (!token) {
    return res.status(401).json({
      message: 'The Token Missed',
    });
  }
  token = token.split('Bearer ')[1];

  let userInfo = null;

  let decode = await verifyJWT(token);

  if (typeof decode === 'object') {
    userInfo = decode?.data;
  } else if (typeof decode === 'string') {
    userInfo = JSON.parse(decode)?.data;
  }

  if(!newPassword){
    return res.status(401).json({
        message:'No password received'
    })
  }
  const userID = userInfo?.id;
 //console.log(userID);

 if(!AppDataSource.isInitialized){
    await AppDataSource.initialize()
 }

 const accountRepo = AppDataSource.getRepository(Account) 
 const targetedAccount = await accountRepo.findOne({
    relations:{
        user:true
    },
    where:{
        user:{
            id:userID
        }
    }
 })
 targetedAccount!.password = encryption(newPassword)
 await accountRepo.manager.save(targetedAccount)
  res.status(200).json({
    message: 'Successfully changed the password',
  });
};

export default userInfoChange;
