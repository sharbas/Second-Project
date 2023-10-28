import jwt from 'jsonwebtoken'

const hotelGenerateToken=(res,hotelId)=>{
    const token=jwt.sign({hotelId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    res.cookie('htljwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000
    })
    return token
}

export default hotelGenerateToken