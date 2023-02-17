import { useContext,useEffect, useState } from "react" 
import { ModeContext } from "../../../context/ModeContext" 



const BtnMode =()=>{
    const [showItems,setShowItems]=useState(false)
    const {activeMode,setActiveMode} = useContext(ModeContext)

const handelShowItems =()=>{
    setTimeout(()=>{
        setShowItems(showItems ? false : true)
    },200)
}

const setModeHandeler =(title)=>{
    setActiveMode(title ==="bx-devices" ? "" : title==="bx-moon" ? "dark" : "light" )
    setShowItems(false);
}

useEffect(()=>{
    const body = document.querySelector("body");
    body.setAttribute("class",`${activeMode}`);
},[activeMode])


    return(

        <div className="fixed z-50 right-2 top-2 lg:top-4 lg:right-8  text-slate-200">
        <div className="relative ">
        <button onFocus={handelShowItems} onBlur={handelShowItems} title="حالت نمایش" className={`absolute outline-none flex justify-center items-center text-center w-12 h-12  bg-[var(--color-gray)]  rounded-full`}>
         <i  onClick={handelShowItems} className={`bx ${activeMode === "" ? "bx-devices" : activeMode === "dark" ? "bx-moon" : "bxs-sun"} text-2xl cursor-pointer`}></i>   
        </button>
        <ul  className={`z-50 absolute top-0 ${showItems ? "flex" : "hidden"} flex-col justify-start items-center h-auto w-36 rounded-3xl p-2  text-3xl bg-[var(--color-gray)]`}>
          <li onClick={()=>setModeHandeler("bxs-sun")} className="hover:bg-[var(--color-orange)] rounded-2xl cursor-pointer p-1 my-1 w-full flex justify-start items-start mx-2">
            <i  title="حالت روشن" className='bx bxs-sun cursor-pointer'></i>
            <span className="cursor-pointer mr-3 text-[.6rem] font-bold">حالت روشن</span>
          </li>
          <li onClick={()=>setModeHandeler("bx-moon")} className="hover:bg-[var(--color-orange)] rounded-2xl cursor-pointer p-1 my-1 w-full flex justify-start items-center mx-2">
            <i  title="حالت تاریک" className='bx bx-moon cursor-pointer'></i>
            <span className="cursor-pointer mr-3 text-[.6rem] font-bold">حالت تاریک</span>
          </li>
          <li onClick={()=>setModeHandeler("bx-devices")} className="hover:bg-[var(--color-orange)] rounded-2xl cursor-pointer p-1 my-1 w-full flex justify-start items-center mx-2">
            <i  title="مطابق حالت دستگاه شما" className='bx bx-devices cursor-pointer'></i>
            <span className="cursor-pointer mr-3 text-[.6rem] font-bold">مطابق دستگاه شما</span>
          </li>
         </ul> 
            </div>
        </div>
    )
}


export default BtnMode
