import { useRouter } from "next/router"
import Image from "next/image"
import portfolioData from "../../data/portfolioData.json"
import Layout from "../../components/layout/Layout"
import NotItem from "../../components/design/NotItem/NotItem"
import { useEffect, useState } from "react"
import Loading from "../../components/design/Loading/Loading"


const PortfolioPage = (props)=>{
    const {query} = useRouter();
    const {title} = query;
    const item = portfolioData.portfolio.find((item)=>item.title === title)



if(portfolioData){
    return(
        <Layout activeNavItem={"portfolio"} title={title}>
        {item ? (
           <section>
           <h2 className="text-[var(--color-orange)] text-3xl text-center px-2 py-3">{item.title}</h2>
           <Image src={item.coverImg} width={600} height={300} alt={item.title}/>
           <article>
            <div>
            <i className='bx bxs-category'></i>
            </div>
            <div>
            <i className='bx bxs-notepad'></i>
            </div>
            <div>
            <i className='bx bx-code-alt'></i>
            </div>
            <div>
            <i className='bx bx-link-alt' ></i>
            </div>
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