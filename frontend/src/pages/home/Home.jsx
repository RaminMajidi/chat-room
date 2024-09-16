import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

//  sm:h-[450px] md:h-[550px] 
//     

const Home = () => {
  return (
    <div className=" bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg 
    bg-opacity-60 w-[90dvw] h-[96dvh] md:max-w-4xl rounded-lg overflow-hidden 
    flex flex-col md:flex-row">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home