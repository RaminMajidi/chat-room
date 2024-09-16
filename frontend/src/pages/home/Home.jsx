import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
  

const Home = () => {
  return (
    <div className=" bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg 
    bg-opacity-60 w-[95dvw] h-[90vh] md:max-w-4xl rounded-lg overflow-hidden 
    flex flex-col md:flex-row">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home