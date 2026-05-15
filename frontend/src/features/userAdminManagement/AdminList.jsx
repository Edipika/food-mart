import React, { useState, useEffect } from 'react';
import Layout from '../../common/admin/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nullSuccessMsg } from '../editSlice';
import { useGetAdminQuery, useDeleteAdminMutation } from './userAdminApi';

function AdminList() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const successMessage = useSelector((state) => state.editSlice.successMsg);
    const { data: admins, isLoading, refetch } = useGetAdminQuery();
    const [deleteAdmin, { isSuccess, isError, error }] = useDeleteAdminMutation()
    useEffect(() => { refetch(); }, [refetch, isSuccess]);
    if (isLoading) return <p>Loading...</p>;
    return (
        <>
            <Layout>
                <div className="m-10">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Admin List</h2>
                        <button
                            onClick={() => (navigate('/addAdmin'))}
                            className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                            Add Admin
                        </button>
                    </div>
                    {successMessage && (
                        <div className="bg-green-700 p-1 rounded text-white flex justify-between items-center">
                            <span>{successMessage}</span>
                            <button
                                onClick={() => dispatch(nullSuccessMsg())}
                                className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-800 transition duration-200"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <table className="min-w-full border-gray-200 rounded-lg">
                        {/* Table Header */}
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="text-left p-4 border-b font-semibold">Sr No</th>
                                <th className="text-left p-4 border-b font-semibold">Name</th>
                                <th className="text-left p-4 border-b font-semibold">email</th>
                                <th className="text-left p-4 border-b font-semibold">Role</th>
                                {/* <th className="text-left p-4 border-b font-semibold">Edit</th> */}
                                <th className="text-left p-4 border-b font-semibold">Delete</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {admins && admins.length > 0 ? (
                                admins.map((admin, index) => (
                                    <tr key={admin.id} className="hover:bg-gray-50">
                                        <td className="p-4 border-b">{index + 1}</td>
                                        <td className="p-4 border-b">{admin.name}</td>
                                        <td className="p-4 border-b">{admin.email}</td>
                                        <td className="p-4 border-b">{admin.role}</td>
                                        <td className="p-4 border-b">
                                            <button
                                                onClick={() => deleteAdmin(admin.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">
                                        No admins found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    );
}

export default AdminList;


