import Layout from "../../components/layout/Layout"
import Head from "next/head"
import Loading from "../../components/design/Loading/Loading"
import PageTitle from "../../components/design/PageTitle/PageTitle"
import PersonalInfos from "../../components/about/PersonalInfos"
import BtnDownload from "../../components/design/BtnDownload/BtnDownload"
import SideItems from "../../components/about/SideItems"
import { useEffect, useState } from "react"
import { getData } from "../../utils/GetData"
import { Alert } from "../../utils/Alert"


const About = (props)=>{

  const [data,setData] = useState();
 
  useEffect(()=>{
    console.log(props)
    props.error ? ( Alert(props.error,"error")) : (setData(props.aboutData))
  },[props])

    return(
        <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {data ? (
          <Layout title={"About"} activeNavItem={"about"}>
          <PageTitle topicTitle={"ABOUT "} topicTitle2={"ME"} belowTitle={"RESUME"}/>
           <section className="mt-4 flex flex-col lg:flex-row justify-center items-center w-full lg:w-[85%] mx-auto max-w-6xl">
            <div className="flex flex-col justify-start items-start px-2 py-1">
            <PersonalInfos data={data.personalInfos}/>
            <BtnDownload classes={"mr-3"}/>
            </div>
              <SideItems data={data.sideItems}/>
           </section>
        </Layout>
        ) : (<Loading/>)}
         </>
    )
}



export async function getStaticProps(){
  const data = await getData("data","aboutData.json");
  if(data.errno){
   return{
     props:{error:"خطای سرور"}
   }
  }else{
   return{
     props:{aboutData:JSON.parse(data)}
   }
  }
 }

export default About