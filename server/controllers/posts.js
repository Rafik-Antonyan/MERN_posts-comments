import { User, Post } from "../models/index.js"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"
import { Comment } from "../models/index.js"

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })
            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            })

            return res.status(200).json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imageUrl: "",
            author: req.userId
        })

        await newPostWithoutImage.save()
        await User.findOneAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage }
        })
        res.status(200).json(newPostWithoutImage)
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}

// Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if (!posts) {
            return res.status(405).json({ message: 'Not available posts.' })
        }

        res.status(200).json({ posts, popularPosts })
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}

// Get Post By ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        if (!post) {
            return res.status(405).json({ message: 'Not available post.' })
        }

        res.status(200).json(post)
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}

// Get My Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}

// Delete Post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.status(405).json({ message: "Post is not found" })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id }
        })

        res.status(200).json({ message: "Post was deleted successfully." })
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}

// Update Post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)
        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ""
        }
        post.title = title
        post.text = text

        await post.save()

        res.status(200).json(post)
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}

// Get Comments By PostID 
export const getCommentsById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map(comment => {
                return Comment.findById(comment)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        res.status(405).json({ message: "Something went wrong" })
    }
}