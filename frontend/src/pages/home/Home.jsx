import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import GlassContainer from '../../components/custom/GlassContainer'


const Home = () => {
  return (
    <GlassContainer>
      <Sidebar />
      <MessageContainer />
    </GlassContainer>
  )
}

export default Home