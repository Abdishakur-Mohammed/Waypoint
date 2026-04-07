import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send("Unauthorized")
        }
        const token = authHeader.split(" ")[1]

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedToken.userId).select("-password")
        next()

    } catch (error) {
        console.log("Unable to authorize", error)
        res.status(401).send("Unauthorized")

    }
}

export default protect;