import {  NextApiRequest, NextApiResponse  } from 'next'
import AppDataSource from 'db/data-source'
import {Account} from 'db/entities/index'
import {createJWT} from 'util/jwt'
import {encryption} from 'util/md5'

const login = async (req:NextApiRequest,res:NextApiResponse) => {
   
    const {email = null, password = null} = req.body

    if(!email || !password ){
        return res.status(401).json({
            message:'email or password missed'
        })
    }
    try {
        if(!AppDataSource.isInitialized){
           await AppDataSource.initialize()
        }
    } catch (error:any) {
       return res.status(500).json({
            message:error?.message || 'Failed to initialize the AppDataSource'
        })
    }

    const accountAccount = AppDataSource.getRepository(Account)
    const user = await accountAccount.findOne({
        where:{
            email,
            password:encryption(password)
        },
        relations:{
            user:true
        }
    })
    // console.log(user)
    if(user && user.id){
        try {
          const token =  await createJWT(user) 
          return res.status(200).json({
            message:'successfully loged in',
            token,
            admin:user.id<=20 ? true : false
        })
        } catch (error:any) {
            res.status(500).json({
                message:error?.message || 'Failed to create JWT'
            })
        }
    } else if(!user){
        return res.status(401).json({
            message:'the password and username are not matched'
        })
    }
}

export default login