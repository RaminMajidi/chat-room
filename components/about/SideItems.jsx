import Cunter from "../design/Cunter/Cunter"

const SideItems =({data})=>{

    return(
        <section className=" w-full lg:w-[60%] grid grid-cols-12 gap-1 px-3 py-2">
            {data.map((item,index)=>(
                <div key={index} className="border border-gray-300 rounded-md p-2 max-[350px]:col-span-12 col-span-6 md:col-span-3 lg:col-span-6 h-36 m-1 ">
                  <h3 className="text-4xl p-1 mt-2 text-[var(--color-orange)] font-bold"><Cunter start={0} end={item.value} duration={2} id={item.id}/><span className="">+</span></h3>
                  <p className="text-xl text-[var(--color-text)] p-1 mt-2">{item.title}</p>
                </div>
            ))}

        </section>
    )
}

export default SideItems