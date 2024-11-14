import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../config/Api';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
  };

  const handleEditUser = (id) => {
    const user = users.find(user => user.id === id);
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await updateUser(id, updatedUser);
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 bg-gray-100">
      <h1 className="text-center text-2xl sm:text-3xl text-teal-500 mb-6 font-bold">User Management Dashboard</h1>
      
      <div className="flex flex-col items-start sm:flex-row sm:justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-teal-600">Add a new user</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm sm:text-base mt-3 sm:mt-0"
        >
          Add
        </button>
      </div>

   
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by First Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="flex-grow">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full table-auto text-sm text-gray-700 sm:table">
              <thead>
                <tr className="bg-teal-100 text-teal-700">
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">First Name</th>
                  <th className="px-6 py-3 text-left">Last Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.company.name}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="bg-rose-700 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-teal-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md disabled:bg-gray-200"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage)))}
              disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateUser={handleUpdateUser}
        userToEdit={userToEdit}
      />
    </div>
  );
};

export default UserList;
