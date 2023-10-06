import { NextApiRequest, NextApiResponse } from 'next';
import {encryption} from 'util/md5'
import AppDataSource from 'db/data-source'
import {Account, User} from 'db/entities/index'
const signUp = async (req:NextApiRequest, res: NextApiResponse) => {

    const {email = null,password = null, fullname = null, address = null, mobile = null, status = 0} = req.body

    // check if the value of status is 0 or 1
    if(Number.parseInt(status) != 1 && Number.parseInt(status) != 0){
        return res.status(200).json({
            message:'the status only can be 1 or 0'
        })
    }

    try {
        if(!AppDataSource.isInitialized)
        await AppDataSource.initialize()
    } catch (error:any) {
        res.status(500).json({
            message:error?.message || 'Failed to Initializ the AppDataSource',
        })
    }

   if(!(email && password && address && mobile && fullname)){
    return res.status(401).json({
        message:'Neccessary Data Missed'
    })
   }

    //console.log('aaa')
    const accounRepo = AppDataSource.getRepository(Account)
   // const userRepo = AppDataSource.getRepository(User)
   // console.log(accounRepo)
    try {
      const resAccount =  await accounRepo.findOne({
            where:{
                email
            }
        })

       const resUser = await AppDataSource.getRepository(User).findOne({
            where:{
                fullname
            }
          })
      if(resAccount || resUser)
      return res.status(401).json({
      message:'The user has already existed'
          
    })
    } catch (error:any) {
       return res.status(500).json({
            message:error?.message || 'Failed to find a response from User or Account'
        })
    }
    let newAccount = new Account()
    newAccount.email = email
    newAccount.password = encryption(password)
    let newUser = new User()
    newUser.address = address
    newUser.fullname = fullname
    newUser.mobile = mobile
    newUser.status = status
    newAccount.user = newUser

    try {
       // await userRepo.manager.save(newUser)
        //console.log('ppp')
        await accounRepo.manager.save(newAccount)
        res.status(200).json({
            message:'Successfully Signed up'
        })
    } catch (error:any) {
        console.log(error)
        res.status(500).json({
            message:error?.message || 'Failed to save new account information'
        })
    }
  

    


    

    

};

export default signUp;
