import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

//  sm:h-[450px] md:h-[550px] 
//     

const Home = () => {
  return (
    <div className=" bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg 
    bg-opacity-60 w-full h-[98vh] md:max-w-4xl rounded-lg overflow-hidden 
    flex flex-col md:flex-row">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home