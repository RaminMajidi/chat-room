import Layout from "../../components/layout/Layout"
import Loading from "../../components/design/Loading/Loading"
import PageTitle from "../../components/design/PageTitle/PageTitle"
import PersonalInfos from "../../components/about/PersonalInfos"
import BtnDownload from "../../components/design/BtnDownload/BtnDownload"
import SideItems from "../../components/about/SideItems"
import Skills from "../../components/about/Skills"
import SubSkills from "../../components/about/SubSkills"
import Education from "../../components/about/Education"
import { useEffect, useState } from "react"
import {GetData}  from "../../utils/GetData"
import Alert  from "../../utils/Alert"


const About = (props)=>{

  const [data,setData] = useState();
 
  useEffect(()=>{
    props.error ? ( Alert(props.error,"error")) : (setData(props.aboutData))
  },[props])

    return(
        <>
        {data ? (
          <Layout title={"About"} activeNavItem={"about"}>
          <PageTitle topicTitle={"ABOUT "} topicTitle2={"ME"} belowTitle={"RESUME"}/>
           <section className="mt-4 w-full lg:w-[85%] mx-auto max-w-6xl">
            <article className=" flex flex-col lg:flex-row justify-start my-8">
            <div className="flex flex-col justify-start items-start px-2 py-1">
            <PersonalInfos data={data.personalInfos}/>
            <BtnDownload classes={"mr-3"}/>
            </div>
              <SideItems data={data.sideItems}/>
            </article>
            <article>
            <Skills data={data.skills}/>
            <SubSkills data={data.subskills}/>
            <Education data={data.exANDed}/>
            </article>
           </section> 
        </Layout>
        ) : (<Loading/>)}
         </>
    )
}



export async function getStaticProps(){
  const data = await GetData("data","aboutData.json");
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