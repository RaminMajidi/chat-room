import { useRouter  } from "next/router"
import Image from "next/image"
import portfolioData from "../../data/portfolioData.json"
import Layout from "../../components/layout/Layout"
import NotItem from "../../components/design/NotItem/NotItem"
import Loading from "../../components/design/Loading/Loading"
import Link from "next/link"
import BtnBack from "../../components/design/BtnBack/BtnBack"
import { useState } from "react"


const PortfolioPage = (props)=>{
  const [imgLoading,setImgLoading]=useState(true);
    const {query} = useRouter();
    const {title} = query;
    const item = portfolioData.portfolio.find((item)=>item.title === title)

if(portfolioData){
    return(
        <Layout activeNavItem={""} title={title}>
        {item ? (
           <section>
            <div className="relative">
            <span className={`${imgLoading?"inline-block":"hidden"} absolute w-full h-full transition-all duration-500 ease-in-out  lg:rounded-2xl bg-gradient-to-r from-[var(--color-main)] to-[var(--color-orange)] animate__animated animate__flash animate__slower	2s animate__infinite	infinite`}></span>
           <Image onLoadingComplete={(image)=>{
            setImgLoading(false)
            image.classList.remove("opacity-0")
            }} src={item.coverImg} width={880}
             height={420} alt={item.title}
            className="opacity-0 mx-auto my-2 p-2"/>
            </div>
           <article className=" w-full max-w-4xl mx-auto flex flex-col justify-start px-1  flex-wrap lg:px-4 py-2">
            <div className="px-1 flex flex-wrap w-full justify-start items-center">
               <div className="p-1 my-2 w-full h-10 flex items-center md:max-w-max text-[var(--color-text)]">
                 <i className='bx bxl-sketch text-2xl text-red-600 ml-1'></i>
                 <p className="my-2 text-base "><span> عنوان : </span><span>{item.title}</span></p>
               </div>
               <div className="p-1 my-2 w-full h-10 flex items-center md:max-w-max text-[var(--color-text)]">
                 <i className='bx bxs-category text-2xl text-red-600 ml-1'></i>
                 <p className="my-2 text-base "><span>دسته بندی : </span><span>{item.category}</span></p>
               </div>
               <div className="p-1 my-2 w-full h-10 flex items-center md:max-w-max text-[var(--color-text)]">
                 <i className='bx bx-calendar text-2xl text-red-600 ml-1'></i>
                 <p className="my-2 text-base "><span>سال ساخت : </span><span>{item.yearOf}</span></p>
               </div>
               <div className="p-1 my-2 w-full h-10 flex items-center md:max-w-max text-[var(--color-text)]">
                 <i className='bx bx-link-alt text-2xl text-red-600 ml-1'></i>
                 <p className="my-2 text-base "><span>لینک برنامه : </span><Link className="text-left text-[var(--color-orange)]" href={item.url} target={"_blank"}>برای مشاهده کلیک کنید</Link></p>
               </div>
            </div>

            <div className="p-2 my-2 w-full h-10 flex items-center text-[var(--color-text)]">
            <i className='bx bx-code-alt text-2xl text-red-600 ml-1'></i>
            <p className="my-2 text-base "><span>زبانها : </span><span>{item.languages?.length ? item.languages.join(' , ') :"فاقد آیتم!"}</span></p>
            </div>
            {item.packeages?.length ? (
                <div className="p-2 my-2 w-full h-10 flex items-center text-[var(--color-text)]">
                <i className='bx bxs-notepad text-2xl text-red-600 ml-1'></i>
                <p className="my-2 text-base "><span>وابستگیها : </span><span>{item.packeages.join(' , ')}</span></p>
                </div>
            ) : (null)}
            <BtnBack/>
           </article>
           </section>
           
        ) : (<NotItem/>)}
        
        </Layout>
    )
}else{
    return(
        <Loading/>
    )
}


}


export default PortfolioPage;