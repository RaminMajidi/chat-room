import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'


const Home = () => {
  return (
    <div className='bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg 
    bg-opacity-60 w-full h-full md:max-w-screen-lg md:max-h-[600px] md:flex'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home