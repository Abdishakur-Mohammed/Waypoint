import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server running ")

})

app.use('/api/users', userRoutes)
app.use('/api/applications', applicationRoutes)

connectDB()


app.listen(PORT, () => {
    console.log(`App running at ${PORT}`)
})