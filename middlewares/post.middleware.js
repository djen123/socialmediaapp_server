// when user first logsin , server produces token , that token the is used for further access 
// but the problem is token produced by one user can be used to change or delete other users information in the database
// so additional middleware so that only autheticated user or real owner can have access to his data and change or amend his data 

//check if post belongs to owner and let him update , create or delete
import Post from "../models/post.model.js"
export const isPostOwner= async (req,res,next)=>{

    try{
        // take id from params
        const {id}= req.params
        // check given id has a post in database
        const post = await Post.findById(id)
        // if not then send error
        if(!post)
{
    return res.status(404).json({
        message:"post not found"
    })
}
 // if authenticated user and author of the post doesnt match send error
    if(post.author!= req.user._id){
        return res.status(403).json({
            message:"forbidden, you are not author of the post"
        })
    }
    //if matches pass to next middleware or next function
    next()
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:"something went wrong"
        })
    }
}