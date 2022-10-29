import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './Routes/Post.js'
import userRoutes from './Routes/user.js'
import * as dotenv from 'dotenv'

const app = express()

dotenv.config()


app.use(bodyParser.json({ limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit:'30mb', extended: true}));

app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const CONNETION_URL = `mongodb://mudassir0616:pocof1@ac-wpijeke-shard-00-00.k8zekki.mongodb.net:27017,ac-wpijeke-shard-00-01.k8zekki.mongodb.net:27017,ac-wpijeke-shard-00-02.k8zekki.mongodb.net:27017/?ssl=true&replicaSet=atlas-at7wjr-shard-0&authSource=admin&retryWrites=true&w=majority`

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNETION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(()=> app.listen(PORT, ()=> console.log(`Server is Running on Port ${PORT}`)))
   .catch((error)=> console.log(error.message))

// mongoose.set('useFindAndModify', false)

// 27.106.83.145/32