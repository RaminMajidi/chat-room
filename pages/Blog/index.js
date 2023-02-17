import Loading from '../../components/design/Loading/Loading';
import Image from 'next/image';
import UpdatePage from '../../components/design/UpdatePage/UodatePage';
import Layout from '../../components/layout/Layout';
import {useState } from 'react';

const Blog =(props)=> {

  const [imgLoading,setImgLoading]=useState(true);
 
  return (
    <>
    {imgLoading && 
    <Loading/>
    }
     <Layout title={"Blog"} activeNavItem={"blog"}>
      <UpdatePage setImgLoading={setImgLoading} imgLoading={imgLoading}/>
     </Layout>
    </>
           
)
}
export default Blog
