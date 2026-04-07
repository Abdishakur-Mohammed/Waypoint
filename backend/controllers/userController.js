import User from '../models/User.js'
import bcrypjs from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        //validation 
        if (username.length < 3) {
            return res.status(400).json({ message: "The username should be at least 3 character" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "the password should be at least 6 characters" })
        }

        const isExistingEmail = await User.findOne({ email })
        if (isExistingEmail) {
            return res.status(400).json({ message: "the email already exists" })
        }

        const isExistingUsername = await User.findOne({ username })
        if (isExistingUsername) {
            return res.status(400).json({ message: "username already taken" })
        }

        const user = await User.create({
            username, email, password
        })

        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.log("User not created", error)
        return res.status(500).json({ message: "Internal server error" })

    }

}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: "invalid credentials" })

        const matchPassword = await bcrypjs.compare(password, existingUser.password)
        if (!matchPassword) return res.status(401).json({ message: "invalid credentials" })

        const token = generateToken(existingUser._id)
        res.status(200).json({ message: "User logged in successfully", token })

    } catch (error) {
        console.log("Unable to login")
        res.status(500).json({ message: "internal server error" })

    }


}