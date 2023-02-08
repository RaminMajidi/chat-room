import '../styles/globals.css';
import "animate.css/animate.min.css";
import AnimatedCursor from '../components/design/AnimatedCursor/AnimatedCursor';

function MyApp({ Component, pageProps }) {
  return(
    <>
    <AnimatedCursor color="255, 166, 0" innerSize={8} outerSize={50} innerScale={1} outerScale={1.7} outerAlpha={0.3} clickables={['input','a']}/>
    <Component {...pageProps} />
    </>
  )

}

export default MyApp
