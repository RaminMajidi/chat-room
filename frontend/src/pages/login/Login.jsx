import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import DotsLoading from '../../components/custom/DotsLoading'

const Login = () => {

    const [inputs, setInputs] = useState({
        userName: '',
        password: ''
    })

    const { loading, login } = useLogin();


    const submitHandler = async (e) => {
        e.preventDefault()
        await login(inputs)
    }

    return (
        <div className='mx-auto flex flex-col items-center w-full justify-center md:max-w-96'>
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding 
            backdrop-filter backdrop-blur-lg bg-opacity-60">
                <h1 className="text-3xl font-semibold text-center to-gray-300">
                    Login
                    <span className="text-blue-500">ChatApp</span>
                </h1>

                <form onSubmit={submitHandler}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                UserName
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter UserName"
                            className="input input-bordered w-full h-10"
                            value={inputs.userName}
                            onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input input-bordered w-full h-10"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <Link to='/signup' className="link link-warning mt-2 inline-block">
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button disabled={loading} className="btn btn-block btn-sm mt-2">
                            {!loading ? ("Login") : (<DotsLoading />)}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login