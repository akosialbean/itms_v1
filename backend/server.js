import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js'
const port = process.env.port || 5000


import userRoutes from './routes/userRoutes.js'
import deviceRoutes from './routes/deviceRoutes.js'
import ipRoutes from './routes/ipRoutes.js'

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/devices', deviceRoutes)
app.use('/api/ip', ipRoutes)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolved()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
}else{
    app.get('/', (req, res) => {
        res.send('Server is ready!')
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port: ${port}`))