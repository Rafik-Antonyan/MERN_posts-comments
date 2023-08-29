import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: null,
    status: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password }, thunkAPI) => {
    try {
        const { data } = await axios.post('/auth/register', {
            username,
            password
        })
        if (data.token) {
            localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        console.log(err, "----");
        return thunkAPI.rejectWithValue(err)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, thunkAPI) => {
    try {
        const { data } = await axios.post('/auth/login', {
            username,
            password
        })
        if (data.token) {
            localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        console.log(err, "----");
        return thunkAPI.rejectWithValue(err)
    }
})

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/auth/me')
        return data
    } catch (err) {
        console.log(err, "----");
        return thunkAPI.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.user = null
            state.isLoading = null
            state.status = null
        }
    },
    extraReducers: {
        // Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // get me
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejected]: (state) => {
            state.status = null
            state.isLoading = false
        }
    }
})

export const { logout } = authSlice.actions

export const checkIsAuth = (state) => Boolean(state.auth.token)

export default authSlice.reducer