import Swal from 'sweetalert2';


 const Alert = async (title,icon,btnText="متوجه شدم !")=>{

    Swal.fire({
        title: `${title}`,
        icon:`${icon}`,
        confirmButtonText:`${btnText}`,
        confirmButtonColor:"var(--color-orange)",
        background:"var(--color-text)",
        color:"var(--color-main)",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })


}
export default Alert