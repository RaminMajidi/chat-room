

const Education = ({data})=>{

    return(
        <section className=' w-full p-1 my-5'>
        <hr className='w-[50%] mx-auto my-8 border-[var(--color-gray)]' />
         <h2 className='text-[var(--color-text)] font-bold text-center text-2xl p-1 mb-8'>تجربه و آموزش</h2>
         <div className=" grid grid-cols-12 gap-2 px-2 py-1">
            {data.map((item,index)=>(
                <div key={index} className="flex h-auto min-h-[12rem]  col-span-12 md:col-span-6">
                    <div className="relative h-full">
                    <i className='absolute z-10 top-0 right-0 w-8 h-8 rounded-full bg-[var(--color-orange)] text-center text-white text-xl bx bxs-briefcase'></i>
                    <span className="absolute top-1 right-[0.9rem] h-[90%] border border-[var(--color-orange)]"></span>
                    </div>
                    <div className=" mr-11 w-full p-2 text-[var(--color-text)]">
                        <div className="flex w-full justify-start mb-2">
                        <h4 className="bg-[var(--color-pray)] px-2 py-1 rounded-3xl">{item.sYear}</h4>
                        <h4 className="bg-[var(--color-pray)] px-2 py-1 rounded-3xl mr-4">{item.eYear}</h4>
                        </div>
                        <h4 className="px-2 py-1 text-lg">{item.title}</h4>
                        <h5 className="px-2 py-1 text-lg">{item.college}</h5>
                        <p className="px-2 py-1 text-base text-justify">{item.desc}</p>
                    </div>
                </div>
            ))}  
        </div>
        </section>  
    )
}

export default Education;