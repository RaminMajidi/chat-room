import Joint from './Joint'

const Desktop = () => {
    return (
        <div className={`md:flex flex-col border-r p-4 border-slate-500  
        top-0 w-full max-w-80 relative left-0 h-full hidden `}
        >
            <Joint />
        </div>
    )
}

export default Desktop