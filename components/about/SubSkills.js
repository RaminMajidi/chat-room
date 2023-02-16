import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import { useState } from 'react';

const SubSkills =({data})=>{
    const [imgLoading,setImgLoading]=useState(true);


    return(
        <section className='w-full p-1 my-5'>
        <hr className='w-[50%] mx-auto my-8 border-[var(--color-gray)]' />
         <h2 className='text-[var(--color-text)] font-bold text-center text-2xl p-1 mb-8'>مهارتهای فرعی من</h2>
         <div className="flex flex-wrap justify-center px-2 py-1">
            {data.map((item,index)=>(
            <div key={index} className='relative mx-4 my-2 rounded-full'>
            <span className={`${imgLoading?"inline-block":"hidden"} rounded-full absolute w-full h-full transition-all duration-500 ease-in-out  lg:rounded-2xl bg-gradient-to-r from-[var(--color-main)] to-[var(--color-orange)] animate__animated animate__flash animate__slower	2s animate__infinite	infinite`}></span>
             <Image  onLoadingComplete={(image)=>{
                    setImgLoading(false)
                    image.classList.remove("opacity-0")
                   }}
                     src={item.img} width={50} height={50}
                    alt={item.title} title={item.title}
                    className="opacity-0"/>
            </div>
            ))}
        </div>
        </section>
    )
}


export default SubSkills;