import Head from "next/head"
import Loading from "../../components/design/Loading/Loading"
import PageTitle from "../../components/design/PageTitle/PageTitle"
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import GetData from "../../utils/GetData"
import { Alert } from "../../utils/Alert"


const Contact = (props)=>{

  const [data,setData] = useState();
 
  useEffect(()=>{
    props.error ? ( Alert(props.error,"error")) : (setData(props.contactData))
  },[props])


    return(
        <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {data ? (
          <Layout title={"Blog"} activeNavItem={"cantact"}>
          <PageTitle topicTitle={"Get in "} topicTitle2={"Touch"} belowTitle={"contact"}/>
          <section className=" w-full max-w-2xl mx-auto p-2 flex flex-col text-[var(--color-text)]">
              <div className="animate__animated animate__backInLeft">
              <h2 className="p-2 text-2xl font-bold">{data["subTitle"][0].title}</h2>
              <p className="p-2 text-justify leading-7 text-lg lg:text-xl lg:leading-9 ">{data["subTitle"][0].desc}</p>
              </div>
         
            <div className="animate__animated animate__delay-1s animate__backInRight flex flex-col items-center p-2">
              {data.stringItems.map((item)=>(
                <div className="flex w-full items-center my-1" key={item.id}>
                  <div key={item.icon_name} className="">
                    <i className={`${item.icon_name} text-3xl text-[var(--color-orange)] h-8 w-8`} ></i>
                  </div>
                  <div className="pr-3" key={item.id+1}>
                    <h4 className="py-1 text-[var(--color-gray)] font-bold text-xs lg:text-lg">{item.title}</h4>
                    <p className="py-1 lg:font-bold">{item.text}</p>
                  </div>
                </div>   
              ))}
              {data.linkItems.map((item)=>(
              <div className="flex w-full items-center my-1" key={item.id}>
                 <div key={item.icon_name} className="">
                   <i className={`${item.icon_name} text-3xl text-[var(--color-orange)] h-8 w-8`} ></i>
                  </div>
                 <div className="pr-3" key={item.id+1}>
                   <h4 className="py-1 text-[var(--color-gray)] font-bold text-xs lg:text-lg">{item.title}</h4>
                   <a href={item.link} className="block cursor-pointer border-none outline-none  py-1 lg:font-bold hover:text-[var(--color-orange)] focus:text-[var(--color-orange)]">{item.text}</a>
                 </div>
              </div>
            ))}

            </div>
            
            <div className="animate__animated animate__delay-2s animate__bounceIn  flex justify-start items-center p-2 my-2">
              {data.Socials.map((item)=>(
              <Link key={item.id} title={item.title} href={item.link} target={"_blank"} className="border-none outline-none cursor-pointer w-10 h-10 flex items-center justify-center rounded-full  ml-4 transition-all ease-in-out duration-500 bg-[var(--color-gray)] hover:scale-125 focus:scale-125 hover:bg-[var(--color-orange)] focus:bg-[var(--color-orange)]">
              <i className={`${item.icon_name}  text-2xl font-bold text-[var(--color-main)] cursor-pointer`} ></i>
              </Link>
              ))
              }
            </div>
          </section>
        </Layout>
        ) : (<Loading/>)}
         </>
    )
}



export async function getStaticProps(){
  const data = await GetData("data","contactData.json");
  if(data.errno){
   return{
     props:{error:"خطای سرور"}
   }
  }else{
   return{
     props:{contactData:JSON.parse(data)}
   }
  }
 }

export default Contact