import React from 'react'

const CallBox = ({ children }) => {
    return (
        <section className="w-full max-w-[450px] flex flex-col px-2">
            {children}
        </section >
    )
}

export default CallBox