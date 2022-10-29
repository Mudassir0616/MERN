import express  from "express";
import { createPost, deletePost, getPosts, likePost } from "../controller/getpost.js";
import authMW from "../middleware/authMW.js";

const router = express.Router()

//We added authMW before the initialization of actions on the posts so that we can populate the request and then can have access to that in actions
//here we are passing ( req.userId ) in the likePost

router.get('/', getPosts)
router.post('/',authMW, createPost)
router.delete('/:id',authMW, deletePost)
router.patch('/:id/likePost',authMW, likePost)

export default router