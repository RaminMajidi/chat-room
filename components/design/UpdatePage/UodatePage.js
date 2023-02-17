import Image from "next/image"


const UpdatePage =(props)=>{
    const {imgLoading,setImgLoading} = props
    return(
        <>
         <div className="relative w-72 h-60 mx-auto">
                <span className={`${imgLoading?"inline-block":"hidden"} rounded-2xl absolute w-full h-full transition-all duration-500 ease-in-out  lg:rounded-2xl bg-gradient-to-r from-[var(--color-main)] to-[var(--color-orange)] animate__animated animate__flash animate__slower	2s animate__infinite	infinite`}></span>
                <Image onLoadingComplete={(image)=>{
                                setImgLoading(false)
                                image.classList.remove("opacity-0")
                              }}
                className="opacity-0 transition-opacity duration-300 ease-in-out mx-auto mt-3"
                src={"/images/setingSite.gif"} width={400} height={200} alt="Seting"/>
                </div>
                <h2 className="text-center mt-24 text-[var(--color-orange)] p-3">با عرض پوزش این قسمت از سایت در حال بروزرسانی است و فعلا دردسترس نیست !!!</h2>
        </>
    )
}

export default UpdatePage