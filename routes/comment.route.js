import {Router}from 'express'
import Comment from '../models/comment.model.js'
import { fetchComments,createComment,updateComment,deleteComment } from '../controllers/comment.controller.js'
import {isAuthenticated} from '../middlewares/auth.middleware.js'

const router = Router()


router.get("/",fetchComments)
router.post("/",isAuthenticated,createComment)
router.post("/",isAuthenticated,updateComment)
router.post("/",isAuthenticated,deleteComment)


export default router