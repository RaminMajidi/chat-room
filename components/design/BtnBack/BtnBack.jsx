

const BtnBack =()=>{

    return(
        <button title="بازگشت به صفحه قبل" onClick={()=>window.history.back()} className="cursor-pointer custom-btn btn-7"><span>بازگشت</span></button>
    )
}

export default BtnBack;