import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const islogedin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verify = Jwt.verify(token, process.env.JWT_KEY);
        req.userId = verify.id;
        next()
    } catch (error) {
        return res.status(401).send({ error: error.message })
    }
}
export default islogedin;