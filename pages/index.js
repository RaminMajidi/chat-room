import fs from "fs/promises"
import path from "path";
import Alert from '../utils/Alert';
import Loading from '../components/design/Loading/Loading';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import BtnDownload from '../components/design/BtnDownload/BtnDownload';
import { useEffect, useState } from 'react';


const Home = (props) => {

  const [data, setData] = useState();
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    props.error ? (Alert(props.error, "error")) : (setData(props.homeData))
  }, [props])

  return (
    <>
      {data ? (
        <Layout title={"Home"} activeNavItem={"home"}>
          <div className='clip-path'></div>
          <section className='relative w-[100%] lg:min-h-screen flex flex-col
           lg:flex-row-reverse justify-start items-center'>
            <div className=' relative flex w-[180px] h-[180px] rounded-full 
            border-8 border-solid border-[var(--color-main)] lg:rounded-3xl
             lg:pt-3  lg:border-none  bg-transparent lg:w-[60vh] lg:min-w-[250px]
              lg:ml-3 lg:h-[75vh]  mt-1'>
              <span className={`${imgLoading ? "inline-block" : "hidden"} rounded-full
               lg:rounded-3xl absolute w-full h-full transition-all duration-500 ease-in-out
                 bg-gradient-to-r from-[var(--color-main)] to-[var(--color-orange)]
                  animate__animated animate__flash animate__slower	2s animate__infinite
                  	infinite`}></span>
              <Image onLoadingComplete={(image) => {
                setImgLoading(false)
                image.classList.remove("opacity-0")
              }}
                alt='My-Image'
                src={"/images/" + data.image}
                width={500}
                id="MY_IMAGE"
                height={500}
                className="opacity-0  rounded-full lg:rounded-3xl
                 text-slate-200 " />
            </div>
            <div className='lg:ml-14 z-20 py-1 px-5'>
              <h1 className='animate__animated animate__flash animate__delay-1s text-[var(--color-orange)] py-1 text-2xl lg:text-5xl md:text-4xl font-bold'>{data.title}</h1>
              <h2 className='animate__animated animate__flash animate__delay-2s an font-[Poppins] text-[var(--color-gray)] py-1 text-lg lg:text-3xl md:text-2xl  mt-3 font-bold tracking-widest	'>{data.subTitle}</h2>
              <p className='animate__animated animate__pulse animate__delay-3s   lg:inline-block lg:w-[50vw]  text-[var(--color-text)] py-1 text-justify leading-8 text-lg lg:text-xl lg:leading-10'>{data.desc}</p>
              <BtnDownload />
            </div>
          </section>
        </Layout>
      ) : (<Loading />)}

    </>
  )
}

export async function getStaticProps() {

  try {
    const fileAddres = path.join(process.cwd(), "data", "homeData.json");
    const data = await fs.readFile(fileAddres);
    return {
      props: { homeData: JSON.parse(data) }
    }
  } catch {
    return {
      props: { error: "خطای سرور" }
    }
  }

}

export default Home
