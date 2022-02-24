import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const generateToken = (data) => {
    return Jwt.sign(data, process.env.JWT_KEY, { expiresIn: '3h' })
}
export default generateToken;