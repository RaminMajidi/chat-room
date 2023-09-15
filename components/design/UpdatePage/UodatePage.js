import Image from "next/image"


const UpdatePage =()=>{
   
    return(
        <>
         <div className="relative w-72 h-60 mx-auto">
                <Image 
                className=" transition-opacity duration-300 ease-in-out mx-auto mt-3"
                src={"/images/setingSite.gif"} width={400} height={200} alt="Seting"/>
                </div>
                <h2 className="text-center mt-24 text-[var(--color-orange)] p-3">
                    {"با عرض پوزش این قسمت از سایت در حال بروزرسانی است و فعلا دردسترس نیست !!!"}
                </h2>
        </>
    )
}

export default UpdatePage