import Jwt from "jsonwebtoken"

const genearteTokenAndSetCookie = async (userId, res) => {
    const token = Jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '15d' }
    )
    res.cookie('Jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // prevent xss attacks cross-site scripting attacks
        sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
    return token
}

export default genearteTokenAndSetCookie