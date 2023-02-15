
const PersonalInfos = ({data})=>{

    return(
        <section className="w-full">
            <h2 className="text-[var(--color-text)] p-1 pr-3 text-2xl font-bold" >اطلاعات شخصی</h2>
            <div>
                <ul className="pr-3 my-3 flex flex-wrap w-full">
                {data.map((item,index)=>(
                   <li key={index} className="w-full min-[460px]:w-[50%] p-1 text-base md:text-lg font-bold "><span className="text-[var(--color-gray)]">{item.title+" : "}</span><span className={`${item.sub==="condition"?"text-green-700":"text-[var(--color-text)]"} `}>{item.text}</span></li>
                ))
                }
                </ul>
            </div>
        </section>
    )
}
export default PersonalInfos;