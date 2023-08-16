

const Skills = ({ data }) => {

    return (
        <section className=' w-full p-1 mt-10 mb-3'>
            <hr className='w-[50%] mx-auto my-8  border-[var(--color-gray)]' />
            <h2 className='text-[var(--color-text)] font-bold text-center text-2xl p-1 mb-8'>مهارتهای اصلی من</h2>
            <div className="flex flex-wrap justify-center px-2 py-1">
                {data.map((item, index) => (
                    <div className='w-40 flex flex-col justify-center items-center m-1 md:m-4'>
                        <div key={index} className='w-full  lg:w-56 flex flex-col justify-center items-center mx-4 my-2'>
                            <img
                                className='h-[100px] w-[100px]'
                                src={item.img}
                                alt={item.title}
                                title={item.title}
                            />
                        </div>
                        <h3 className='my-1 text-[var(--color-gray)] text-lg font-[Poppins] uppercase tracking-widest'>{item.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}


export default Skills;