import {NextApiRequest, NextApiResponse} from 'next'
import AppDataSource from 'db/data-source'
import {Task} from 'db/entities/index'
import setTimer from 'util/setTimer'
const autoCheck = async (req:NextApiRequest, res:NextApiResponse) => {
    const taskID = req.body?.taskID
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize()
    }

    const taskRepo = AppDataSource.getRepository(Task)

    const currentTask = await taskRepo.findOne({
        where:{
            id:taskID
        }
    })
    if(currentTask?.timer_id != 0){
        return res.status(200).json({
            message:'The task has been set up a timer'
        })
    }
    currentTask!.timer_id = Number(setTimeout(setTimer, 1000*60*3,currentTask?.id))
    
    const response = await taskRepo.manager.save(currentTask)
    console.log(response)
    res.status(200).json({
        message:'ok',
        timer_id:currentTask?.timer_id
    })

}
export default autoCheck