import { NextApiRequest, NextApiResponse } from 'next';
import AppDataSource from 'db/data-source'
import {User, Task} from 'db/entities/index'
import {verifyJWT} from 'util/jwt'
import formatDistance from 'date-fns/formatDistance'
import format from 'date-fns/format'
const record = async (req: NextApiRequest, res: NextApiResponse) => {
  // post start work
  /* const date = new Date();
  console.log(date.toLocaleString('en-US', {timeZone: 'America/New_York'})); */

  // put end work
  res.status(200).json({
    message:'Success',
    data:req.headers.authorization
  })
  let token:string | undefined  = req.headers.authorization
  
  let userInfo = null
  if(!token){
    return res.status(403).json({
        message:'the request missed jwt token'
    })
  } else{
   // console.log(token);
    token = token.split('Bearer ')[1]
    
    try {
        const decode =  await verifyJWT(token)
        if(typeof decode === 'object'){
          userInfo = decode
        } else if(typeof decode === 'string'){
          userInfo = JSON.parse(decode)
        }
        //userInfo = decode
       
        } catch (error:any) {
          res.status(401).json({
              message:error?.message || 'Invalid JWT Token'
          })
        }
      
  }

  try {
    if(!AppDataSource.isInitialized)
    await AppDataSource.initialize()
  } catch (error:any) {
    res.status(500).json({
      message:error?.message || 'Failed to initialize the AppDataSource'
    })
  }
  
 //console.log(userInfo)

  const method = req.method;
  //console.log(method);
  
  const userID =  Number.parseInt(userInfo?.data?.id)
  //console.log(typeof userID)
  //console.log(userID)
  const userRepo = AppDataSource.getRepository(User)
  const taskRepo = AppDataSource.getRepository(Task)

  if (method === 'POST') {
    
    //let newTask = new Task()
   const currentUser = await userRepo.findOne({
    where:{
      id:userID
    },
    relations:{
      tasks:true
    }
   })

   if(!currentUser){
    return res.status(403).json({
      message:'The User attached to the JWT does not exist'
    })
   }
   if(currentUser.status === 1){
    return res.status(403).json({
      message:'Before start new work, you shoud finish the work on your hand'
    })
   }
   let newTask = new Task()
   newTask.user = currentUser
   newTask.start_time = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
   newTask.end_time = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
   newTask.timer_id = 0
   newTask.total_worktime = 0.0
   newTask.user.status = 1
   newTask.location = ''
   try {
    let response = await taskRepo.manager.save(newTask)
    res.status(200).json({
      message: 'time to work',
      data:{
        taskID:response?.id,
        start_time:response.start_time,
        location:response.location,
        status:response.user?.status,
      } 

    });
   } catch (error:any) {
      return res.status(500).json({
        message:error?.message || 'Failed to write into DB'
      })
   }
  
  } else if (method === 'PUT') {

    let {taskID = null, location = null} = req.body
    taskID = Number(taskID)
    //console.log(taskID)
    //console.log(typeof taskID)
    if(!location){
    return res.status(401).json({
      message:'Location Infomation Missed'
    })
  }

    if(!taskID){
      return res.status(401).json({
        message:'taskID is required'
      })
    }

    const currentUser = await userRepo.findOne({
      where:{
        id:userID
      },
      relations:{
        tasks:true
      }
    })
   // console.log(currentUser?.id)
   
    if(!currentUser){
      return res.status(403).json({
        message:'The user does not exist'
      })
    }
    if(currentUser.status === 0){
      return res.status(401).json({
        message:'Before you end the work, you should start a work first'
      })
    }
    const currentTask = await taskRepo.findOne({
      where:{
        id:taskID
      },
      relations:{
        user:true
      }
    })
    //console.log(currentTask)
    if(!currentTask){
      return res.status(401).json({
        message:'The task does not exist, the user might not start work'
      })
    }
    if(currentUser?.id != currentTask?.user?.id){
      return res.status(403).json({
        message:'The current user operating the system is not authorizd'
      })
    }
    currentTask!.end_time = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    currentTask.user!.status = 0
    if(currentTask?.start_time){
      let total_worktime_string = formatDistance(new Date(currentTask.start_time),new Date(currentTask.end_time))
      
     // console.log(total_worktime_string)
      let total_worktime_arr = total_worktime_string.split(' ') 
      if(total_worktime_arr.length === 2){
        let total_worktime = (Number.parseInt(total_worktime_arr[0]))/60
        currentTask.total_worktime = total_worktime
      }else if(total_worktime_arr.length === 3){
        currentTask.total_worktime = Number.parseInt(total_worktime_arr[1])
      }


     // console.log(currentTask)
     currentTask.location = location
     const response =  await taskRepo.manager.save(currentTask)
     // console.log(response.timer_id)
     clearTimeout(response.timer_id)
     res.status(200).json({
      message: 'time to rest',
      data:{
        status:response.user?.status,
        start_time:response.start_time,
        end_time:response.end_time,
        total_worktime:response.total_worktime,
        location:response.location
      }
    });
   }
  
  }
};

export default record;
