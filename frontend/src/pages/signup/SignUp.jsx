import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';
import DotsLoading from '../../components/custom/DotsLoading';

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const { loading, signup } = useSignUp()

    const submitHandler = async (e) => {
        e.preventDefault()
        await signup(inputs)
    }

    const checkBoxChangeHandler = (gender) => {
        setInputs({ ...inputs, gender })
    }


    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
                  backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center to-gray-300">
                    Sign Up
                    <span className="text-blue-500">ChatApp</span>
                </h1>

                <form onSubmit={submitHandler}>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                FullName
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ramin Majidi"
                            className="input input-bordered w-full h-10"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                UserName
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="ramindev01"
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

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                ConfirmPassword
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Confirm Password"
                            className="input input-bordered w-full h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox
                        onCheckBoxChange={checkBoxChangeHandler}
                        selectedGender={inputs.gender}
                    />

                    <Link to='/login' className="link link-warning mt-2 inline-block">
                        Alreday have an account?
                    </Link>

                    <div>
                        <button
                            disabled={loading}
                            className="btn btn-block btn-sm mt-2">
                            {!loading ? ("Sign Up") : (<DotsLoading />)}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp;