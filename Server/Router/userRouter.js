import express from 'express'
import userauth from '../Middleware/usermiddleware.js'
import { getUserData } from '../Controller/userController.js'

const userRouter = express.Router()

userRouter.get('/data',userauth,getUserData)

export default  userRouter