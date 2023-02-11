import { useRouter } from "next/router"
import Image from "next/image"
import portfolioData from "../../data/portfolioData.json"
import Layout from "../../components/layout/Layout"
import NotItem from "../../components/design/NotItem/NotItem"
import { useEffect, useState } from "react"
import Loading from "../../components/design/Loading/Loading"
import Link from "next/link"


const PortfolioPage = (props)=>{
    const {query} = useRouter();
    const {title} = query;
    const item = portfolioData.portfolio.find((item)=>item.title === title)



if(portfolioData){
    return(
        <Layout activeNavItem={"portfolio"} title={title}>
        {item ? (
           <section>
           <Image onLoadingComplete={(image)=>{image.classList.remove("opacity-0")}} src={item.coverImg} width={1000} height={500} alt={item.title} className="opacity-0 mx-auto my-3 p-2"/>
           <article className=" w-full max-w-4xl mx-auto flex justify-start items-center flex-wrap p-2">
           <div className="p-2 w-full h-10 flex items-center md:w-[50%] text-[var(--color-text)]">
            <i className='bx bxl-sketch text-3xl text-red-600'></i>
            <p className="mr-3 text-lg font-bold"><span> عنوان : </span><span>{item.title}</span></p>
            </div>
            <div className="p-2 w-full h-10 flex items-center lg:w-[50%] text-[var(--color-text)]">
            <i className='bx bxs-category text-3xl text-red-600'></i>
            <p className="mr-3 text-lg font-bold"><span>دسته بندی : </span><span>{item.category}</span></p>
            </div>
            <div className="p-2 w-full h-10 flex items-center md:w-[50%] text-[var(--color-text)]">
            <i className='bx bx-code-alt text-3xl text-red-600'></i>
            <p className="mr-3 text-lg font-bold"><span>زبانها : </span><span>{item.languages?.length ? item.languages.join(' , ') :"فاقد آیتم!"}</span></p>
            </div>
            <div className="p-2 w-full h-10 flex items-center md:w-[50%] text-[var(--color-text)]">
            <i className='bx bx-link-alt text-3xl text-red-600'></i>
            <p className="mr-3 text-lg font-bold"><span>لینک برنامه : </span><Link className="text-left text-[var(--color-orange)]" href={item.url} target={"_blank"}>برای مشاهده کلیک کنید</Link></p>
            </div>
            {item.packeages?.length ? (
                <div className="p-2 w-full h-10 flex items-center text-[var(--color-text)]">
                <i className='bx bxs-notepad text-3xl text-red-600'></i>
                <p className="mr-3 text-lg font-bold"><span>وابستگیها : </span><span>{item.packeages.join(' , ')}</span></p>
                </div>
            ) : (null)}
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