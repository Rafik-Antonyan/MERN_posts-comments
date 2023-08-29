import { Comment, Post } from '../models/index.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body
        if (!comment) return res.status(405).json({ message: "Comment can't be empty" })
        const newComment = new Comment({ comment })
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id }
            })
        } catch (err) {
            console.log(err);
            res.status(405).json({ message: "Somthing went wrong" })
        }

        res.status(200).json(newComment)
    } catch (err) {
        console.log(err);
        res.status(405).json({ message: "Somthing went wrong" })
    }
}

