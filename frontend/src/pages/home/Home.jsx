import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'


const Home = () => {
  return (
    <div className='bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg 
    bg-opacity-60 w-full h-full max-h-[90dvh] md:max-w-screen-lg md:max-h-[600px]
     md:flex overflow-hidden relative'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home