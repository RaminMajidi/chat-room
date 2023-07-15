

const BtnBack =()=>{

    return(
        <button title="بازگشت به صفحه قبل" onClick={()=>window.history.back()} className="cursor-pointer custom-btn btn-7 mt-2"><span>بازگشت</span></button>
    )
}

export default BtnBack;