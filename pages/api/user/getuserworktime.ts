import {NextApiRequest, NextApiResponse} from 'next'
import AppDataSource from 'db/data-source'
import { Task, User } from 'db/entities'
import { verifyJWT } from 'util/jwt'

const getUserWorktime =async (req:NextApiRequest, res:NextApiResponse) => {
    const token = req.body?.token
    let userInfo = null
    console.log(token)
    try {
        const decode =  await verifyJWT(token)
        if(typeof decode === 'object'){
          userInfo = decode?.data
        } else if(typeof decode === 'string'){
          userInfo = JSON.parse(decode)?.data
        }
       
        } catch (error:any) {
          res.status(401).json({
              message:error?.message || 'Invalid JWT Token'
          })
        }
    console.log(userInfo)
    if(!AppDataSource.isInitialized){
       await AppDataSource.initialize()
    }
    const taskRepo = AppDataSource.getRepository(Task)
    const userRepo = AppDataSource.getRepository(User)
    const currentUser = await userRepo.findOne({
        where:{
            id:userInfo?.id
        }
    })
    if(currentUser?.status === 0){
        return res.status(201).json({
            message:'The user is off duty'
        })
    }

    const currentTask = await taskRepo.findOne({
        relations:{
            user:true
        },where:{
            user:{
                id:userInfo?.id
            },
            total_worktime:0
        }
    })
    console.log(currentTask)
    if(!currentTask){
        return res.status(203).json({
            message:'The current user do not have any active tasks'
        })
    }
    
    return res.status(200).json({
        message:'welcome back',
        data:{
            taskID:currentTask?.id,
            start_time:currentTask?.start_time,
            location:currentTask?.location,
            status:currentTask?.user?.status,
          } 
    })
    
      
}
export default getUserWorktime