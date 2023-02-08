import {saveAs} from "file-saver"

const BtnDownload = ({url,text,classes})=>{

    const saveFile = () => {
        saveAs(
          "https://github.com/RaminMajidi/resumeFile/archive/refs/heads/main.zip",
          "RaminMajidi.zip"
        );
      };

    return(
        <button onClick={saveFile} className={`overflow-hidden outline-none relative group cursor-pointer flex items-center w-[12rem] h-12 mx-auto my-4 bg-transparent rounded-full border border-[var(--color-orange)] ${classes}`}><span className="inline-block absolute left-0 w-0 h-12 transition-all duration-500 group-hover:w-full group-hover:bg-[var(--color-orange)] group-focus:w-full group-focus:bg-[var(--color-orange)]" ></span><span className="cursor-pointer z-10  text-[var(--color-text)] flex justify-start items-center pr-5 text-xl">دانلود رزومه</span><i className="bx bxs-cloud-download absolute flex justify-center items-center left-0 cursor-pointer bg-[var(--color-orange)] p-2 text-slate-100 w-12 h-12 rounded-full text-4xl"></i></button>
    )
}

export default BtnDownload