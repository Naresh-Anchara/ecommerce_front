import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi'
import UpdateUserModal from './UpdateUserModal';

const ManageUsers = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [selectedUser,setSelectedUser] = useState(false);
    const {data : users=[],error,isLoading,refetch} = useGetUserQuery();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id).unwrap();
            alert("User deleted successfully");
            refetch();

        } catch (error) {
            console.error("Failed to delete the User",error);
        }
    }

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    }
     
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    }
  return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>error loading users data!</div>}
    
    <section className="py-1 bg-blueGray-50">
<div className="w-full mb-12 xl:mb-0 px-4 mx-auto ">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">All Users</h3>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
        </div>
      </div>
    </div>
    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                         NO.
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          User email
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                         User Role
                        </th>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        edit or manage
            </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                         Actions
                        </th>
          </tr>
        </thead>

        <tbody>
  {users &&
    users.map((user, index) => {
      return (
        <tr key={index}>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
            {index + 1}
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
           {user?.email || 'N/A'}
          </td>
          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <span
          className={`rounded-full py-[2px] px-3 ${user?.role === "admin"
            ? "bg-indigo-500 text-white":
            "bg-amber-300"
          }`}
          >
          {" "}
          {user?.role}
          </span>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 hover:text-primary">
           <button 
           onClick={() =>handleEdit(user)}
           className='flex gap-1 items-center hover:text-red-600'>
            <i className='ri-edit-2-line'></i>
            Edit
           </button>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
           <button 
           onClick={() => handleDelete(user?._id)}
           className='bg-red-600 text-white px-2 py-1'>Delete</button> 
          </td>
        </tr>
       );
     })}
   </tbody>


        </table>
       </div>
    </div>
   </div>
    
<footer className="relative pt-8 pb-6 mt-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-6/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
    </section>
    
    {isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal}
    onRoleUpdate={refetch}
    />}
    </>
  )
}

export default ManageUsers
