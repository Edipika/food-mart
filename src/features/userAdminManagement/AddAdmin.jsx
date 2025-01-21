import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../common/admin/Layout';
import { useAddAdminMutation } from './userAdminApi';
import { setSuccessMsg } from '../editSlice';
import { useDispatch } from 'react-redux';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

function AddAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        pwd: '',
        role: 2 //for admins
    });
    const [matchPwd, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "matchPwd") {
            setMatchPwd(value);
        }
        setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }))
    }
    useEffect(() => {
        setErrMsg('');
    }, [admin, matchPwd])
    const [addAdmin, { isSuccess, isError, error, }] = useAddAdminMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (admin.pwd !== matchPwd) {
            setErrMsg("Passwords do not match!");  // Set the error message
            return;
        } else {
            const formData = new FormData();
            formData.append('name', admin.name);
            formData.append('email', admin.email);
            formData.append('pwd', admin.pwd);
            formData.append('role', admin.role);
            // Log FormData content
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }

           const response=  await addAdmin(formData);
           console.log(response);
        }

    };
    useEffect(() => {
        if (isSuccess) {
            dispatch(setSuccessMsg('Admin Added Successfully!!'));
            navigate('/admin');
        }
    }, [isSuccess]);

    return (
        <>
            <Layout>
                <button
                    className="mt-3 ml-3 p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                >
                    Add Admin
                </button>
                <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
                    {(errMsg || isError) && (
                        <span className="text-red-500 text-sm">
                            {errMsg || error?.data?.message || 'An error occurred'}
                        </span>
                    )}
                    <form onSubmit={handleSubmit}  className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold mb-1">
                                UserName:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={admin.name}
                                onChange={handleChange}
                                className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="Email" className=" font-semibold mb-1">
                                Enter Email:
                            </label>
                            <input
                                type='text'
                                name="email"
                                id="Email"
                                value={admin.email}
                                onChange={handleChange}
                                className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                placeholder="Enter your email address"
                            />

                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className=" font-semibold mb-1">
                                Enter Password:
                            </label>
                            <input
                                type="text"
                                name="pwd"
                                id="password"
                                value={admin.pwd}
                                onChange={handleChange}
                                className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                placeholder="Create a password"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Matchpassword" className=" font-semibold mb-1">
                                Confirm Password:
                            </label>
                            <input
                                type="text"
                                name="matchPwd"
                                id="Matchpassword"
                                value={matchPwd}
                                onChange={handleChange}
                                className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                placeholder="Create a password"
                            />
                        </div>

                        <div className='flex gap-3'>
                            <button
                                type="submit"
                                className="p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => (navigate('admin'))}
                                className="p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}
export default AddAdmin






