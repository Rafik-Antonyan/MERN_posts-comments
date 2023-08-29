import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false
}

export const createComment = createAsyncThunk("comment/createComment", async ({ postId, comment }, thunkAPI) => {
    try {
        const { data } = await axios.post(`/comments/${postId}`, { postId, comment })
        return data
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err)
    }
})

export const getComments = createAsyncThunk("comment/getComments", async (id, thunkAPI) => {
    try {
        const { data } = await axios.get(`/posts/comments/${id}`)
        return data
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err)
    }
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {
        [getComments.pending]: (state) => {
            state.loading = true
        },
        [getComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getComments.rejected]: (state) => {
            state.loading = false
        },
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const { } = commentSlice.actions

export default commentSlice.reducer