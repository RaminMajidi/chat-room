import '../styles/globals.css';
import "animate.css/animate.min.css";
import AnimatedCursor from '../components/design/AnimatedCursor/AnimatedCursor';
import { ModeContext } from '../context/ModeContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [activeMode, setActiveMode] = useState("");
  console.error = () => { }
  console.warn = () => { }

  return (
    <>
      {/* <AnimatedCursor
        color="255, 166, 0"
        innerSize={8}
        outerSize={50}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0.3}
        clickables={['input', 'a']} /> */}
      <ModeContext.Provider value={{ activeMode, setActiveMode }}>
        <Component {...pageProps} />
      </ModeContext.Provider>
    </>
  )

}

export default MyApp
