import React, { useState, useEffect } from 'react';

const EditUserModal = ({ isOpen, onClose, onUpdateUser, userToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        username: userToEdit.username,
        email: userToEdit.email,
        department: userToEdit.department || '',
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(userToEdit.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Last Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-black text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
