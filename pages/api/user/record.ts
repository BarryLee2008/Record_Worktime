import { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from 'db/data-source'
import {Task} from 'db/entities/task'
import {verifyJWT} from 'util/jwt'


const record = async (req: NextApiRequest, res: NextApiResponse) => {
  // post start work

  // put end work

  let token:string | undefined  = req.headers.authorization
  let userInfo = null
  if(!token){
    return res.status(403).json({
        message:'the request missed jwt token'
    })
  } else{
    token = token.split('Bearer ')[1]
    try {
        const decode =  await verifyJWT(token)
        userInfo = decode
      
        } catch (error:any) {
          res.status(401).json({
              message:error?.message || 'Invalid JWT Token'
          })
        }
      
  }
  
 console.log(userInfo)

  const method = req.method;
  console.log(method);
  if (method === 'POST') {
    res.status(200).json({
      message: 'POST',
    });
  } else if (method === 'PUT') {
    res.status(200).json({
      message: 'PUT',
    });
  }
};

export default record;
