import Link from "next/link"
import { useState } from "react";


const Header = ({activeNavItem})=>{
    const [homeActive] = useState(activeNavItem==="home" ? true : false)
    const [aboutActive] = useState(activeNavItem==="about" ? true : false)
    const [portfolioActive] = useState(activeNavItem==="portfolio" ? true : false)
    const [cantactActive] = useState(activeNavItem==="cantact" ? true : false)
    const [blogActive] = useState(activeNavItem==="blog" ? true : false)

    return(
       <nav className="fixed z-50 bg-[var(--color-pray)]  lg:bg-transparent  w-[100%] lg:w-[5rem] px-2 py-4 bottom-0 lg:top-[22vh] h-[5rem] lg:h-[max-content] lg:right-5 text-[var(--color-text)] ">
        <article className=" flex lg:flex-col justify-around lg:justify-center w-[100%]">
         <Link className={`animate__animated ${homeActive?"active animate__shakeY":""} group flex justify-center items-center transition-all duration-500 ease-in-out cursor-pointer p-3 relative bg-[var(--color-gray)] text-slate-100 w-12 h-12 rounded-full lg:my-2 hover:bg-[var(--color-orange)]`} href="/" title="خانه"><h2 className="hidden cursor-pointer transition-all duration-500 ease-in-out lg:inline-block bg-[var(--color-orange)] lg:opacity-0  lg:absolute w-0 right-0 p-3 rounded-full lg:group-hover:opacity-100 lg:group-hover:w-32 text-center text-lg overflow-hidden max-h-12">خانه</h2><box-icon title="خانه" type='solid' name='home' color="#fff" size={"32px"}></box-icon></Link>
         <Link className={`animate__animated ${aboutActive?"active animate__shakeY":""} group flex justify-center items-center transition-all duration-500 ease-in-out cursor-pointer p-3 relative bg-[var(--color-gray)] text-slate-100 w-12 h-12 rounded-full lg:my-2 hover:bg-[var(--color-orange)]`} href="/About" title="درباره من"><h2 className="hidden cursor-pointer transition-all duration-500 ease-in-out lg:inline-block bg-[var(--color-orange)] lg:opacity-0  lg:absolute w-0 right-0 p-3 rounded-full lg:group-hover:opacity-100 lg:group-hover:w-32 text-center text-lg overflow-hidden max-h-12">درباره من</h2><box-icon title="درباره من" name='user' type='solid' color="#fff" size={"32px"}></box-icon></Link>
         <Link className={`animate__animated ${portfolioActive?"active animate__shakeY":""} group flex justify-center transition-all duration-500 ease-in-out cursor-pointer items-center p-3 relative bg-[var(--color-gray)] text-slate-100 w-12 h-12 rounded-full lg:my-2 hover:bg-[var(--color-orange)]`} href="/Portfolio" title="نمونه کارها"><h2 className="hidden cursor-pointer transition-all duration-500 ease-in-out lg:inline-block bg-[var(--color-orange)] lg:opacity-0  lg:absolute w-0 right-0 p-3 rounded-full lg:group-hover:opacity-100 lg:group-hover:w-32 text-center text-lg overflow-hidden max-h-12">نمونه کار</h2><box-icon title="نمونه کارها" type='solid' name='briefcase' color="#fff" size={"32px"}></box-icon></Link>
         <Link className={`animate__animated ${cantactActive?"active animate__shakeY":""} group flex justify-center transition-all duration-500 ease-in-out cursor-pointer items-center p-3 relative bg-[var(--color-gray)] text-slate-100 w-12 h-12 rounded-full lg:my-2 hover:bg-[var(--color-orange)]`} href="/Contact" title="ارتباط با من"><h2 className=" hidden cursor-pointer transition-all duration-500 ease-in-out lg:inline-block bg-[var(--color-orange)] lg:opacity-0  lg:absolute w-0 right-0 p-3 rounded-full lg:group-hover:opacity-100 lg:group-hover:w-32 text-center text-lg overflow-hidden max-h-12">تماس با من</h2><box-icon title="ارتباط با من" type='solid' name='envelope-open' color="#fff" size={"32px"}></box-icon></Link>
         <Link className={`animate__animated ${blogActive?"active animate__shakeY":""} group flex justify-center transition-all duration-500 ease-in-out cursor-pointer items-center p-3 relative bg-[var(--color-gray)] text-slate-100 w-12 h-12 rounded-full lg:my-2 hover:bg-[var(--color-orange)]`} href="/Blog" title="وبلاگ"><h2 className="hidden cursor-pointer transition-all duration-500 ease-in-out lg:inline-block bg-[var(--color-orange)] lg:opacity-0  lg:absolute w-0 right-0 p-3 rounded-full lg:group-hover:opacity-100 lg:group-hover:w-32 text-center text-lg overflow-hidden max-h-12">وبلاک</h2><box-icon title="وبلاگ" type='solid' name='chat' color="#fff" size={"32px"}></box-icon></Link>
        </article>
       </nav>
    )
}
export default Header