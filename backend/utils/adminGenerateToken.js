import jwt from 'jsonwebtoken'

const generateToken=(res,adminId)=>{
    const key='abc123'
    const token=jwt.sign({adminId},key,{
        expiresIn:'30d'
    })
    res.cookie('admnjwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000
    })
    return token
}

export default generateToken