import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import SignUp from "../pages/signup/SignUp"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import useListenMessages from "../hooks/useListenMessages"
import { useEffect } from "react"
import Modal from "./custom/Modal"



function App() {
  const { authUser } = useAuthContext();
  useListenMessages();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Modal/>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={authUser ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to={'/'} /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
