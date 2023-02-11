import { getData } from '../utils/GetData';
import { Alert } from '../utils/Alert';
import Loading from '../components/design/Loading/Loading';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import BtnDownload from '../components/design/BtnDownload/BtnDownload';
import { useEffect, useState } from 'react';
import myImg from "../public/images/my-image.png"

const Home =(props)=> {

  const [data,setData] = useState();
 
  useEffect(()=>{
    props.error ? ( Alert(props.error,"error")) : (setData(props.homeData))
  },[props])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data ? (
              <Layout title={"Home"} activeNavItem={"home"}>
              <div className='clip-path'></div>
              <section className='relative w-[100%] min-h-screen flex flex-col lg:flex-row-reverse justify-start items-center'>
              <div className=' relative flex w-[220px] h-[220px] rounded-full border-8 border-solid border-[var(--color-main)] lg:rounded-3xl lg:pt-3  lg:border-none  bg-transparent lg:w-[30vw] lg:min-w-[250px] lg:ml-3 lg:h-[85vh] lg:shadow-[10px_15px_15px_0px_rgba(0,0,0,0.8)] mt-1'>
                <Image onLoadingComplete={(image)=>{image.classList.remove("opacity-0")}} alt='My-Image'  src={"/images/"+data.image} width={700} height={1000} className="opacity-0 bg-[#000] pt-2 rounded-full lg:rounded-3xl text-slate-200 "/>
              </div>
              <div className='lg:ml-14 z-20'>
                <h1 className='animate__animated animate__flash animate__delay-2s text-[var(--color-orange)] text-2xl lg:text-5xl md:text-4xl font-bold text-center p-1 '>{data.title}</h1>
                <h2 className='animate__animated animate__flash animate__delay-3s an font-[Poppins] text-[var(--color-gray)] text-lg lg:text-3xl md:text-2xl text-center p-1 mt-3 font-bold tracking-widest	'>{data.subTitle}</h2>
                <p className='animate__animated animate__pulse animate__delay-4s   lg:inline-block lg:w-[50vw] lg:px-10 text-[var(--color-text)] p-3 text-center leading-8 text-lg lg:text-xl lg:leading-10'>{data.desc}</p>
              <BtnDownload classes={"animate__animated  animate__shakeY animate__delay-1s"}/>
              </div>
              </section>
            </Layout>
      ) : (<Loading/>)}

    </>
  )
}

export async function getStaticProps(){
 const data = await getData("data","homeData.json");
 if(data.errno){
  return{
    props:{error:"خطای سرور"}
  }
 }else{
  return{
    props:{homeData:JSON.parse(data)}
  }
 }
}

export default Home
