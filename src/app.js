import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import sampleRouter from './routes/sample.route.js'
import authRoute from './services/auth.route.js'
import hospitalRouter from './routes/hospital.route.js'

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('./public'))
app.use('/api', sampleRouter)
app.use('/api/auth', authRoute)
app.use('/api', hospitalRouter)

app.get('/api', (req, res) => {
  res.send('<h1>Welcome to server</h1>')
})

export default app