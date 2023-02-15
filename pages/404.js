import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
const index =()=>{


    return(
        <>
        <Head>
            <title>{`RaminMajidi || 404`}</title>
        </Head>

        <div className=" w-full h-screen flex flex-col justify-start items-center">
            <Image width={700} height={400} src="/images/404.png" className="select-none"/>
            <Link className="select-none bg-slate-900 px-8 py-2 outline outline-[2.5px] outline-[#FEBF00] outline-offset-4 text-white rounded-3xl duration-200 hover:outline-offset-8 hover:bg-[var(--color-orange)] " href={"/"}>بیا ببرمت خونه</Link>
        </div>
        </>
    )
}
 

export default index