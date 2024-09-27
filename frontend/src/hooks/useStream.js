import { useEffect, useState } from 'react'

const useStream = () => {

    const [stream, setStream] = useState();

    
    return { stream }
}

export default useStream