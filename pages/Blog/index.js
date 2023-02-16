import fs from "fs/promises"
import path from "path";
import Alert from '../../utils/Alert';
import Loading from '../../components/design/Loading/Loading';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';


const Blog =(props)=> {

  const [data,setData] = useState(true);
  const [imgLoading,setImgLoading]=useState(true);
 
  useEffect(()=>{
    // props.error ? ( Alert(props.error,"error")) : (setData(props.homeData))
  },[props])

  return (
    <>
      {data ? (
            <Layout title={"Blog"} activeNavItem={"blog"}>
                <Image className="mx-auto mt-3" src={"/images/setingSite.gif"} width={400} height={200} alt="Seting"/>
                <h2 className="text-center my-2 text-[var(--color-orange)]">این قسمت از سایت در حال بروزرسانی است !!!</h2>
            </Layout>
      ) : (<Loading/>)}

    </>
  )
}

export async function getStaticProps(){

try{
  const fileAddres = path.join(process.cwd(),"data","blogData.json");
  const data = await fs.readFile(fileAddres);
  return{
    props:{blogData:JSON.parse(data)}
  }
}catch{
  return{
    props:{error:"خطای سرور"}
  }
}

}

export default Blog
