
const PageTitle = ({topicTitle,topicTitle2,belowTitle})=>{

    return(
        <div className=" text-center relative py-2 uppercase ">
            <h2 className="font-[Poppins] z-10 text-[var(--color-text)] absolute w-full font-bold text-3xl lg:text-5xl mt-5 lg:mt-10">{topicTitle}<span className="font-[Poppins] text-[var(--color-orange)]">{topicTitle2}</span></h2>
            <span className="font-[Poppins] inline-block text-[var(--color-gray)] text-6xl lg:text-8xl font-bold tracking-widest opacity-20 mt-1 ">{belowTitle}</span>
          </div>
    )
}

export default PageTitle