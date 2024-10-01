import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import SignUp from "../pages/signup/SignUp"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import useListenMessages from "../hooks/useListenMessages"
import VideoCall from "../pages/videoCall/VideoCall"
import Calling from "../pages/videoCall/Calling"
import useListenCalling from "../hooks/useListenCalling"
import CallingModal from "./custom/CallingModal"
import useCallData from "../zustand/useCallData"




function App() {
  const { authUser } = useAuthContext();
  const { calling } = useCallData();
  useListenMessages();
  useListenCalling();




  return (
    <div className="w-full h-screen flex items-center justify-center">
      {calling && <CallingModal />}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={authUser ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to={'/'} /> : <SignUp />} />
        <Route path="/videoCall" element={authUser ? <VideoCall /> : <Navigate to={'/'} />} />
        <Route path="/calling" element={authUser ? <Calling /> : <Navigate to={'/'} />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
