import React from 'react';
import Navi from '@/Components/Navi';
import UserForm from '@/Components/UserForm';

const UserDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800  mt-4 mb-6">User Details</h1>
      <UserForm />
    </div>
  );
};

export default UserDetails;
