import jwt from 'jsonwebtoken'

const generateToken=(res,adminId)=>{
    const token=jwt.sign({adminId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    res.cookie('admnjwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken