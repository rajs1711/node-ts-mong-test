import express ,{Express}from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectdb from './db/Myconnection'
import rootrouter from './routes/root.router'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app: Express =express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static("public"))

dotenv.config({path:'./.env'})
app.use('/api/v1',rootrouter)
app.use(errorMiddleware)



conectdb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started on PORTS ${process.env.PORT}`)
    })
}).catch((e)=>{
    console.log(`Connection not established`)
})


