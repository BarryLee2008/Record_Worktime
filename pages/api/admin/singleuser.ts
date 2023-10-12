import {NextApiRequest,NextApiResponse} from 'next'

import AppDataSource from 'db/data-source'

import {User} from 'db/entities/index'
import { verifyJWT } from 'util/jwt'
import {format} from 'date-fns'
const singleUserInfo = async (req:NextApiRequest, res:NextApiResponse) => {

    let token = req.headers.authorization
    //console.log(token)
    if(!token) {
        return res.status(401).json({
            message:'No JWT Received'
        })
    }
    token = token?.split('Bearer ')[1]
    //console.log(token)
    let adminID = null
    try {
        const decode = await verifyJWT(token)
        if(typeof decode === 'object'){
            adminID = Number(decode?.data?.id)
        } else if(typeof decode === 'string'){
            adminID = Number(JSON.parse(decode)?.data?.id)
        }
    } catch (error:any) {
        return res.status(401).json({
            message:error?.message || 'Invalid Token'
        })
            
    }
    if(!adminID){
        return res.status(401).json({
            message:'id is null'
        })
    }
    if(adminID && adminID> 20){
        return res.status(403).json({
            message:'You do not have the access to these resources'
        })
    }

    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize()
    }

    const userRepo = AppDataSource.getRepository(User)

    const {period = 10, userID = null} = req.body
    const start_time = format((new Date().getTime() - 1000 * 60 * 60 * 24 * period),'yyyy-MM-dd') + ' 00:00:00'
    const end_time = format(new Date(), 'yyyy-MM-dd') + ' 23:59:59'
    if(!userID){
        return res.status(401).json({
            message:'No ID Received'
        })
    }

    const targetedUser = await userRepo.createQueryBuilder('user')
                                       .leftJoinAndSelect('user.tasks','task','task.start_time BETWEEN :start_time AND :end_time',{
                                        start_time,
                                        end_time
                                       })
                                       .where('user.id = :userID',{userID})
                                       .getOne()
    //console.log(targetedUser)

    return res.status(200).json({
        message:'OK',
        data:targetedUser
    })

}

export default singleUserInfo