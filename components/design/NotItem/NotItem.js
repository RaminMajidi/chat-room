import Image from "next/image"

const NotItem = ()=>{

    return(
        <div className="animate__animated animate__zoomIn text-center">
            <Image width={400} height={200} src={"/images/not-item.png"} alt="Not-Item" className="mx-auto" />
            <p className="text-[var(--color-orange)] text-2xl font-bold  text-center"> آیتمی یافت نشد !!!</p>
        </div>
    )
}
export default NotItem;