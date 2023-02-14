import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';

const SubSkills =({data})=>{

    return(
        <section className=' w-full p-1 my-10'>
        <hr className='w-[50%] mx-auto my-8 border-[var(--color-gray)]' />
         <h2 className='text-[var(--color-text)] font-bold text-center text-2xl p-1 mb-8'>مهارتهای جانبی من</h2>
         <div className="flex flex-wrap justify-center px-2 py-1">
            {data.map((item,index)=>(
            <div key={index} className=' mx-4 my-2'>
             <Image src={item.img} width={50} height={50}  alt={item.title} title={item.title}/>
            </div>
            ))}
        </div>
        </section>
    )
}


export default SubSkills;