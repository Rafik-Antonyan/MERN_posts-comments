import { Route, Routes } from "react-router-dom";
import { Main, Posts, Post, AddPostPage, Register, Login, EditPost } from './pages'
import { Layout } from "./components";
import { ToastContainer } from 'react-toastify'
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="posts" element={<Posts />} />
        <Route path=":id" element={<Post />} />
        <Route path="new" element={<AddPostPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path=":id/edit" element={<EditPost />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
