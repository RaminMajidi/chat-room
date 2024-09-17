import { MdOutlineFullscreen } from "react-icons/md";

const FullScreen = () => {

    
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }


  return (
    <div className="mt-4" onClick={toggleFullScreen} title="Full Screen">
        <MdOutlineFullscreen className="w-6 h-6 text-white cursor-pointer"/>
    </div>
  )
}

export default FullScreen