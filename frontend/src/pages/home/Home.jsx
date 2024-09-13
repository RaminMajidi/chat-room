import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'


const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden
    bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60">
      <Sidebar />
      <MessageContainer/>
    </div>
  )
}

export default Home