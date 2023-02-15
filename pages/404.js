import Image from "next/image"
import Loading from "../components/design/Loading/Loading"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
const Error404 =()=>{
const [loading,setLoading] =useState(true)

    return(
        <>
        <Head>
            <title>{`RaminMajidi || 404`}</title>
        </Head>
        {loading && 
        <Loading/>
        }
            <div className=" w-full h-screen flex flex-col justify-start items-center">
            <Image onLoadingComplete={(image)=>{
                image.classList.remove("opacity-0")
                setLoading(false)
                }} width={700} height={400} src="/images/404.png" className="opacity-0 transition-opacity ease-in-out duration-200 select-none" alt="Error404"/>
            <Link className="select-none bg-slate-900 px-8 py-2 outline outline-[2.5px] outline-[#FEBF00] outline-offset-4 text-white rounded-3xl duration-200 hover:outline-offset-8 hover:bg-[var(--color-orange)] " href={"/"}>بیا ببرمت خونه</Link>
        </div>
        
        </>
    )
}
 

export default Error404