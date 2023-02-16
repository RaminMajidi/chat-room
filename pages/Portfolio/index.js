import fs from "fs/promises"
import path from "path";
import { useEffect, useState } from "react"
import Loading from "../../components/design/Loading/Loading"
import PageTitle from "../../components/design/PageTitle/PageTitle"
import Layout from "../../components/layout/Layout"
import  Alert  from "../../utils/Alert"
import Image from "next/image"
import Link from "next/link"
import { AnimationOnScroll } from 'react-animation-on-scroll';
import NotItem from "../../components/design/NotItem/NotItem"


const Portfolio = (props)=>{
    const[categorys,setCategorys] = useState()
    const[data,setData] = useState();
    const[filterData,setFilterData] = useState([]);
    const[filter,setFilter] = useState("All")
    const [imgLoading,setImgLoading]=useState(true);
useEffect(()=>{
if(props.error){
    Alert(props.error,"error")
}else{
    setData(props.portfolioData.portfolio);
    setFilterData(props.portfolioData.portfolio);
    setCategorys(props.portfolioData.categorys);
}
},[props])

const filterHandeler =(filterCategory)=>{
setFilter(filterCategory)
filterCategory == "All" ? (setFilterData(data)) :(setFilterData(data.filter(item=>item.category === filterCategory)))

}
    return(
        <>
        {filterData ? (
        <Layout title={"Portfolio"} activeNavItem={"portfolio"}>
        <PageTitle topicTitle={"MY"} topicTitle2={"PORTFOLIO"} belowTitle={"WORKS"}/>
        <div  className="w-full flex flex-row-reverse justify-center max-w-7xl mx-auto  mt-32 flex-wrap">
        {categorys &&
            categorys.map((item,index)=>(
            <button  key={index} onClick={()=>filterHandeler(item)} className={`${item == filter ? "text-[var(--color-orange)]" : "text-[var(--color-text)]"} text-base md:text-xl  font-[Poppins] tracking-wide my-1 mx-1 p-1`}>{item}</button>
            )) 
        }
        </div>
        <div className=" overflow-hidden relative w-full flex flex-row-reverse flex-wrap  justify-center max-w-6xl mx-auto my-2 px-2 py-4">
            {filterData.length ? (
                filterData.map((item,index)=>(
                <AnimationOnScroll key={index} duration={2} offset={230} initiallyVisible={index<3?true:false} animateIn="animate__bounceInLeft" animateOut="animate__bounceOutLeft">
                <Link href={`/Portfolio/${item.title}`} key={item.title} className="">
                <div key={item.id} className="group relative overflow-hidden ">
                    <div className="absolute bg-[var(--color-orange)] opacity-0 group-hover:opacity-100  duration-700 ease-in-out cursor-pointer right-0 flex justify-center items-center w-full h-56 md:max-w-[320px] lg:max-w-[350px] md:mx-2 my-4 rounded-2xl">
                        <h2 className="cursor-pointer text-2xl text-slate-100 font-[Poppins]">{item.title}</h2>
                    </div>
                    <div className="w-full h-56 md:max-w-[320px] lg:max-w-[350px] md:mx-2 my-4 rounded-2xl">
                      <span className={`${imgLoading?"inline-block":"hidden"} rounded-2xl absolute w-full h-full transition-all duration-500 ease-in-out  lg:rounded-2xl bg-gradient-to-r from-[var(--color-main)] to-[var(--color-orange)] animate__animated animate__flash animate__slower	2s animate__infinite	infinite`}></span>
                        <Image onLoadingComplete={(image)=>{
                                setImgLoading(false)
                                image.classList.remove("opacity-0")
                              }}
                             width={1300} height={600}  src={item.coverImg}
                            alt={`${item.title}`} className=" opacity-0 w-full h-full rounded-2xl"/>
                    </div>   
                </div>
                </Link>
                </AnimationOnScroll>
                ))
            ) :
             (<NotItem/>)}
        </div>
        </Layout>
        ) : (<Loading/>)}
         </>
    )
}

export async function getStaticProps(){

    try{
        const fileAddres = path.join(process.cwd(),"data","portfolioData.json");
        const data = await fs.readFile(fileAddres);
        return{
          props:{portfolioData:JSON.parse(data)}
        }
      }catch{
        return{
          props:{error:"خطای سرور"}
        }
      }
   }

export default Portfolio