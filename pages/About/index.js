import Layout from "../../components/layout/Layout"
import Head from "next/head"
import Loading from "../../components/design/Loading/Loading"
import PageTitle from "../../components/design/PageTitle/PageTitle"
import { useEffect, useState } from "react"
import { getData } from "../../utils/GetData"
import { Alert } from "../../utils/Alert"


const About = (props)=>{

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
          <Layout title={"About"} activeNavItem={"about"}>
          <PageTitle topicTitle={"ABOUT "} topicTitle2={"ME"} belowTitle={"RESUME"}/>
        </Layout>
        ) : (<Loading/>)}
         </>
    )
}



export async function getStaticProps(){
  const data = await getData("data","contactData.json");
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

export default About