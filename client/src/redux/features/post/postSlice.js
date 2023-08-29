import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false
}

export const createPost = createAsyncThunk("post/createPost", async (params, thunkAPI) => {
    try {
        const { data } = await axios.post("/posts", params)
        return data
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err)
    }
})

export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("/posts/all")
        return data
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err)
    }
})

export const deletePost = createAsyncThunk("post/deletePost", async (id, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/posts/${id}`)
        return data
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err)
    }
})

export const updatePost = createAsyncThunk("post/updatePost", async (updatedPost, thunkAPI) => {
    try {
        const { data } = await axios.patch(`/posts/${updatePost.id}`, updatedPost)
        return data
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err)
    }
})

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.loading = false
        },
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },
        [deletePost.pending]: (state) => {
            state.loading = true
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter(post => post.id !== action.payload._id)
        },
        [deletePost.rejected]: (state) => {
            state.loading = false
        },
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex(post => post._id === action.payload._id)
            state.posts[index] = action.payload
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const { } = postSlice.actions

export default postSlice.reducer