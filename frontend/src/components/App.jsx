import { Navigate, Route, Routes } from "react-router-dom"
import Home from "@pages/home/Home"
import Login from "@pages/login/Login"
import SignUp from "@pages/signup/SignUp"
import Calling from "@pages/calling/Calling"
import { useAuthContext } from "@src/context/AuthContext"
import useListenMessages from "@src/hooks/useListenMessages"
import { Toaster } from "react-hot-toast"
import NotFound from "@components/errors/NotFound";
import usePeerConection from "@src/hooks/usePeerConection"
import useCallListening from "@src/hooks/useCallListening"


function App() {

  const { authUser } = useAuthContext();
  useListenMessages();
  usePeerConection();
  useCallListening();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={authUser ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to={'/'} /> : <SignUp />} />
        <Route path="/calling" element={authUser ? <Calling /> : <Navigate to={'/'} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
