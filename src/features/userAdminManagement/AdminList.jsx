import React, { useState } from 'react';
import Layout from '../../common/admin/Layout';
import { useNavigate } from 'react-router-dom';

function AdminList() {
    const navigate = useNavigate()
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

                    <table className="min-w-full border-gray-200 rounded-lg">
                        {/* Table Header */}
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="text-left p-4 border-b font-semibold">Sr No</th>
                                <th className="text-left p-4 border-b font-semibold">Name</th>
                                <th className="text-left p-4 border-b font-semibold">email</th>
                                <th className="text-left p-4 border-b font-semibold">Role</th>
                                <th className="text-left p-4 border-b font-semibold">Edit</th>
                                <th className="text-left p-4 border-b font-semibold">Delete</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="p-4 border-b ">1</td>
                                <td className="p-4 border-b">admin Name</td>
                                <td className="p-4 border-b">Email</td>
                                <td className="p-4 border-b">Role</td>
                                <td className="p-4 border-b">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200">
                                        Edit
                                    </button>
                                </td>
                                <td className="p-4 border-b ">
                                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200">
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    );
}

export default AdminList;


