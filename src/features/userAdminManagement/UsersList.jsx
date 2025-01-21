import React, { useState, useEffect } from 'react';
import Layout from '../../common/admin/Layout';
import { useGetUserQuery } from './userAdminApi';

function UsersList() {

  const { data: users, isLoading, refetch } = useGetUserQuery();
  useEffect(() => { refetch(); }, [refetch]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <Layout>
        <div className="m-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Users List</h2>
          </div>

          <table className="min-w-full border-gray-200 rounded-lg">
            {/* Table Header */}
            <thead className="bg-slate-200">
              <tr>
                <th className="text-left p-4 border-b font-semibold">Sr No</th>
                <th className="text-left p-4 border-b font-semibold">Name</th>
                <th className="text-left p-4 border-b font-semibold">email</th>
                <th className="text-left p-4 border-b font-semibold">Role</th>
                {/* <th className="text-left p-4 border-b font-semibold">Edit</th> */}
                {/* <th className="text-left p-4 border-b font-semibold">Delete</th> */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b ">{index + 1}</td>
                  <td className="p-4 border-b">{user.name}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout></>
  )
}

export default UsersList
