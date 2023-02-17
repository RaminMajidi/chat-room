import Head from "next/head";
import Header from "../header/Header";
import BtnMode from "../design/BtnMode/BtnMode";

const Layout = ({title,children,activeNavItem,classes})=>{

    return(
        <>
        <Head>
            {/* <!-- start My meta --> */}
            <meta name="color-scheme" content=""></meta>
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Cache-Control" content="no-cache" />
            <meta name="designer" content="ramindev01" />
            <meta name="author" content="frontEnd,Ramin Majidi,RaminDev01,رامین مجیدی" />
            <meta name="owner" content="رامین مجیدی" />
            <meta name="url" content="https://ramin-majidi.netlify.app" />
            <meta name="description" content="برنامه ساخته شده توسط رامین مجیدی به وسیله Next js" />
            {/* <!-- end My meta --> */}
            <link rel="icon" href="/favicon.ico" />
            <title>{`RaminMajidi || ${title}`}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"/>     
        </Head>
        <BtnMode/>
        <Header activeNavItem={activeNavItem}/>
        <section  className={`overflow-hidden animate__animated animate__zoomIn w-full h-full mx-auto mb-[5rem] lg:mb-0 bg-transparent ${classes}`}>
        {children}
        </section>
        </>
    )
}

export default Layout