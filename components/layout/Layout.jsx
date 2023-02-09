import Head from "next/head";
import Header from "../header/Header";

const Layout = ({title,children,activeNavItem,classes})=>{

    return(
        <>
        <Head>
            <meta name="description" content="برنامه ساخته شده توسط رامین مجیدی به وسیله Next js" />
            <title>{`RaminMajidi || ${title}`}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"/>        
        </Head>
        <Header activeNavItem={activeNavItem}/>
        <section className={`animate__animated animate__zoomIn w-full h-full mx-auto mb-[5rem] lg:mb-0 bg-transparent ${classes}`}>
        {children}
        </section>
        </>
    )
}

export default Layout