import PostMessage from "../models/postMessage.js" 
import mongoose from "mongoose"

//FINDING SOMETHING INSIDE OF A MODEL TAKES TIME SO THAT IS WHY WE USE Async() HERE............... 

export const getPosts = async(req, res)=> {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


export const createPost = async(req, res)=>{
    const post = req.body

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save()

        res.status(201).send(newPost)
    } catch (error) {
        res.status(409).send(error)
    }
}


export const deletePost = async(req, res)=>{
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) 
    return (
    res.status(404).send('Found no Post with that Id')
    )

    await PostMessage.findByIdAndRemove(id)
    res.json('Post Deleted !!!')
}


export const likePost = async(req, res)=>{
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthorised user."})

    if(!mongoose.Types.ObjectId.isValid(id)) 
    return ( 
    res.status(404).send('Found no post')
    )
    
    const post = await PostMessage.findById(id)

    //Now we have to see if the Users Id already in the liked section or not
    const index = post.likes.findIndex((id)=> id === String(req.userId))

    if(index === -1){
        //This is statement is for liking the post
        post.likes.push(req.userId)
    } else {
        //for disliking the post 
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    const likedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(likedPost);
}