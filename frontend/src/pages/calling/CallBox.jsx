import React from 'react'

const CallBox = ({ children }) => {
    return (
        <section className="w-full h-full max-h-[96svh] 
        max-w-[300px] flex flex-col justify-center
        sm:max-w-[375px] md:max-w-[450px] mx-1 relative">
            {children}
        </section >
    )
}

export default CallBox