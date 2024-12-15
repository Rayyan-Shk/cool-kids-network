import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircle2, Crown, Star, Shield } from 'lucide-react';

// Character avatars based on role
const RoleIcons = {
  'Cool Kid': <UserCircle2 className="w-24 h-24 text-blue-500" />,
  'Cooler Kid': <Star className="w-24 h-24 text-green-500" />,
  'Coolest Kid': <Crown className="w-24 h-24 text-purple-500" />
};

// Background colors for different roles
const RoleBackgrounds = {
  'Cool Kid': 'bg-blue-50',
  'Cooler Kid': 'bg-green-50',
  'Coolest Kid': 'bg-purple-50'
};

function UserListPage({ user }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const getRoleIcon = (role) => {
    return RoleIcons[role] || <UserCircle2 className="w-24 h-24 text-gray-500" />;
  };

  const getBackgroundClass = (role) => {
    return RoleBackgrounds[role] || 'bg-gray-50';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">
        User Directory
      </h2>
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((userData, index) => (
          <div 
            key={index} 
            className={`rounded-xl shadow-md overflow-hidden ${getBackgroundClass(userData.role)}`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                {getRoleIcon(userData.role)}
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-blue-800">
                    {userData.firstName} {userData.lastName}
                  </h3>
                  <p className="text-blue-600">{userData.role}</p>
                </div>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-lg shadow-inner">
                <div>
                  <label className="block text-blue-700 font-semibold">Country</label>
                  <p className="text-blue-900 flex items-center">
                    <Shield className="mr-2 w-5 h-5 text-blue-500" />
                    {userData.country}
                  </p>
                </div>

                {user.role === 'Coolest Kid' && (
                  <>
                    <div>
                      <label className="block text-blue-700 font-semibold">Email</label>
                      <p className="text-blue-900">{userData.email}</p>
                    </div>
                    <div>
                      <label className="block text-blue-700 font-semibold">Role Privileges</label>
                      <div className="flex items-center">
                        {userData.role === 'Cool Kid' && (
                          <p className="text-blue-900">Basic Access</p>
                        )}
                        {userData.role === 'Cooler Kid' && (
                          <p className="text-green-900 flex items-center">
                            <Star className="mr-2 w-5 h-5 text-green-500" />
                            Can View User Names & Countries
                          </p>
                        )}
                        {userData.role === 'Coolest Kid' && (
                          <p className="text-purple-900 flex items-center">
                            <Crown className="mr-2 w-5 h-5 text-purple-500" />
                            Full Access to User Details
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListPage;