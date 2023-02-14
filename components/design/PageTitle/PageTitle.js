
const PageTitle = ({topicTitle,topicTitle2,belowTitle})=>{

    return(
        <div className=" w-full text-center relative py-2 uppercase ">
            <h2 className=" text-center font-[Poppins] z-10 text-[var(--color-text)] absolute w-full font-bold text-3xl md:text-5xl lg:text-6xl mt-5 lg:mt-10">{topicTitle}<span className="font-[Poppins] text-[var(--color-orange)]">{topicTitle2}</span></h2>
            <span className=" text-center font-[Poppins] inline-block text-[var(--color-gray)] w-full text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest opacity-20 mx-auto mt-1 ">{belowTitle}</span>
          </div>
    )
}

export default PageTitle