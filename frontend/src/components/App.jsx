import { Navigate, Route, Routes } from "react-router-dom"
import Home from "@pages/home/Home"
import Login from "@pages/login/Login"
import SignUp from "@pages/signup/SignUp"
import VideoCall from "@pages/videoCall/VideoCall"
import Calling from "@pages/calling/Calling"
import { useAuthContext } from "@src/context/AuthContext"
import useListenMessages from "@src/hooks/useListenMessages"
import useListenCalling from "@src/hooks/useListenCalling"
import useCallData from "@src/zustand/useCallData"
import { Toaster } from "react-hot-toast"


function App() {
  const { authUser } = useAuthContext();
  const { calling } = useCallData();
  useListenMessages();
  useListenCalling();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* {calling && <CallingModal />} */}
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
