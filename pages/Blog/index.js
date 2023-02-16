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
                <div className="relative w-72 h-60 mx-auto">
                <span className={`${imgLoading?"inline-block":"hidden"} rounded-2xl absolute w-full h-full transition-all duration-500 ease-in-out  lg:rounded-2xl bg-gradient-to-r from-[var(--color-main)] to-[var(--color-orange)] animate__animated animate__flash animate__slower	2s animate__infinite	infinite`}></span>
                <Image onLoadingComplete={(image)=>{
                                setImgLoading(false)
                                image.classList.remove("opacity-0")
                              }}
                className="opacity-0 transition-opacity duration-300 ease-in-out mx-auto mt-3"
                src={"/images/setingSite.gif"} width={400} height={200} alt="Seting"/>
                </div>
                <h2 className="text-center mt-24 text-[var(--color-orange)]">این قسمت از سایت در حال بروزرسانی است !!!</h2>
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
