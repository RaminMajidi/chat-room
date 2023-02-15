import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Skills =({data})=>{

    return(
        <section className=' w-full p-1 mt-10 mb-3'>
            <hr className='w-[50%] mx-auto my-8  border-[var(--color-gray)]' />
         <h2 className='text-[var(--color-text)] font-bold text-center text-2xl p-1 mb-8'>مهارتهای اصلی من</h2>
        <div className="flex flex-wrap justify-center px-2 py-1">
            {data.map((item,index)=>(
            <div key={index} className='w-32 lg:w-56 flex flex-col justify-center items-center mx-4 my-2'>
              <div style={{ width: 110, height: 110  }}>
              <CircularProgressbar
               value={item.percent}
               maxValue={100}
               text={`%${item.percent}`}
               styles={buildStyles({
                pathColor: `var(--color-orange)`,
                textColor:`var(--color-gray)`,
               })}
                />
              </div>
              <h3 className='my-2 text-[var(--color-gray)] text-lg font-[Poppins] uppercase tracking-widest'>{item.title}</h3>
          </div>
            ))}
        </div>
        </section>
    )
}


export default Skills;