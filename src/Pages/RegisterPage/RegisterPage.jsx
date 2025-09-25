import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from './../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RegisterPage = () => {
    const {
        register,       // to connect input fields
        handleSubmit,   // handles form submission
        formState: { errors } // validation errors
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const { createUser,signIngWithGoogle } = useAuth()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(async(result) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Created Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                console.log(result.user);
                    const saveUser = { name: result.user.displayName, email: result.user.email, role: 'customer' }
                    const res = await axiosSecure.post('/users', saveUser)
                    console.log('after posting new user', res.data);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode,errorMessage);
            });
    };
    const handaleGoogle = ()=>{
        signIngWithGoogle()
        .then(result => {
                console.log(result.user);
                const saveUser = { name: result.user.displayName, email: result.user.email, role: 'customer' }
                    axiosSecure.post('/users', saveUser)
                    .then(res => {
                        console.log('after posting new user', res.data);
                    })
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode,errorMessage);
            });
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create an Account
                </h1>
                <p className="mt-2 text-center text-gray-500">Register with Profast</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min length is 6" } })}
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Remember me + Forgot password */}


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#CAEB66] py-3 text-white font-semibold shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center justify-center">
                    <span className="h-px w-full bg-gray-300"></span>
                    <span className="px-3 text-sm text-gray-500">OR</span>
                    <span className="h-px w-full bg-gray-300"></span>
                </div>

                {/* Social Login */}
                <div className="flex flex-col space-y-3">
                    {/* Google */}
                    <button onClick={handaleGoogle}

                        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 py-3 font-medium text-gray-600 hover:bg-gray-100"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    {/* Facebook */}
                    <button

                        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 py-3 font-medium text-gray-600 hover:bg-gray-100"
                    >
                        <FaFacebook className="text-blue-600 text-xl" />
                        <span>Continue with Facebook</span>
                    </button>
                </div>
                {/* Sign Up */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to='/login' className="font-medium text-indigo-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;