import {NextApiRequest,NextApiResponse} from 'next'
import {verifyJWT} from 'util/jwt'



const verifyjwt = async (req:NextApiRequest,res:NextApiResponse) => {
    
    const {token} = req.body
    console.log(token)
    try {
        await verifyJWT(token)
        res.status(200).json({
            message:'The token is valid'
        })
    } catch (error:any) {
        res.status(401).json({
            message:error?.message || 'the token is valid or expired'
        })
    }     
}
export default verifyjwt