import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'


const Home = () => {
  return (
    <div className='bg-gray-950 bg-clip-padding backdrop-filter backdrop-blur-lg 
    bg-opacity-60 w-full h-full md:max-w-screen-lg md:flex'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home