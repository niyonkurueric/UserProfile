import models from "../models"
import generateToken from "../helpers/token";
const { user, profile } = models;
class User {

    static async findOrCreate(req, res) {
        try {
            const {
                id,
                given_name,
                family_name,
                email,
                picture
            } = req.user;

            const logedInUser = await user.findOrCreate({
                where: { googleId: id },
                defaults: { email, googleId: id, firstName: given_name, lastName: family_name }
            })
            console.log(logedInUser[0].id);
            const logedInprofile = await profile.findOrCreate({
                where: { userId: logedInUser[0].id },
                defaults: { userId: logedInUser[0].id, picture: picture }
            })
            const token = generateToken({ id: logedInUser[0].id, email })
            return res.send({ message: "Authenticated well", data: logedInUser, token })
        } catch (error) {
            return res.send({ message: `not well created ${error.message}` })
        }

    }
    static async updateProfile(req, res) {
        try {
            const userid = req.userId;
            const { age, address, education, gender } = req.body;
            const n = await profile.update({ age, address, education, gender }, { where: { userId: userid } })
            return res.status(200).send({ message: "profile updated" })
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }

    }
    static async getProfile(req, res) {
        try {
            const getprofile = await profile.findOne({ where: { id: req.params.id }, include: [{ model: user }] });

            if (getprofile) {
                return res.status(200).send(getprofile)
            }
            return res.status(404).send({ message: "no match profile" })


        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }
}
export default User;