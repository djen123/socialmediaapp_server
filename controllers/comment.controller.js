 import Comment from "../models/comment.model.js"
 import Post from "../models/post.model.js"
import User from "../models/user.model.js"

 


export const fetchComments = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({
        message: "please provide a postId as query parameter"
      });
    }

    const post = await Post.findById(postId)
      .populate("author", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const comments = await Comment.find({ post: postId })
      .select("_id content author")
      .populate("author", "name avatar");

   ;

    res.json({ comments });

  } catch (e) {
    res.status(500).json({
      status: "something wrong"
    });
  }
};


export const createComment = async(req,res)=>{
            //we take only content from the user to change not author
        //we take author id only when its granted ,we take from token or middleware
    try{
        // get user post conetent and post for req.body
        const {content,post} = req.body
        // get user info from req from authenticated token
        const   { user } = req
        //check in the db
        // const existingUser = await User.findById(user._id)
         //check in the db
        const existingPost = await Post.findById(post)
        //if post does not exist then return error
            if(!existingPost){

            return res.status(404).json({
            message:"post not found"
        })
        

    }
    // if found then create new comment 
        const newComment = await Comment.create({
            content,author:user._id,post
        })

       return res.status(201).json({
      message: `comment created`,
      postId : newComment._id
    });
      

    }
    
    catch(e){
        if(e.name === "MongoServerError" && e.code === 11000){
            const field = Object.keys(e.keyPattern)[0];
            return res.status(400).json({
                message:"Invalid input",
                error:` A user with ${field} exist`
            })
        }
        
        
        res.status(500).json({
            status:"something wrong"
        })
       
    }

}
export const updateComment = async (req, res) => {
    try {
        const { id} = req.params
        
        const { content } = req.body

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { content},
            { new: true, runValidators: true }
        )

   

        res.json({
            message: "comment updated",
            data: updatedPost
        })

    } catch (e) {
        res.status(500).json({
            status: "something wrong",
            error: e.message
        })
    }
}
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
    

        const deleteComment = await Post.findByIdAndDelete(
            id )
        
       

        res.json({
            message: "post deleted",
            
        })

    } catch (e) {
        res.status(500).json({
            status: "something wrong",
            error: e.message
        })
    }
}