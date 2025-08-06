import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import connectDB from './db/db.js'

const port = process.env.PORT || 3000

connectDB()
.then(()=>{
     app.listen(port, ()=>{
      console.log(`App is running on port ${port}`)
  })
}).catch((error)=>{
  console.log("Mongodb connection error: ",error)
})
