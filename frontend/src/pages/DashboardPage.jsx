import React from 'react';
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

function DashboardPage({ user }) {
  // Select the appropriate icon and background based on user role
  const RoleIcon = RoleIcons[user.role] || <UserCircle2 className="w-24 h-24 text-gray-500" />;
  const backgroundClass = RoleBackgrounds[user.role] || 'bg-gray-50';

  return (
    <div className={`max-w-lg mx-auto rounded-xl shadow-md overflow-hidden ${backgroundClass}`}>
      <div className="p-8">
        <div className="flex items-center mb-6">
          {RoleIcon}
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-blue-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-blue-600 text-xl">
              {user.role}
            </p>
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-inner">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-700 font-semibold">First Name</label>
              <p className="text-blue-900">{user.firstName}</p>
            </div>
            <div>
              <label className="block text-blue-700 font-semibold">Last Name</label>
              <p className="text-blue-900">{user.lastName}</p>
            </div>
          </div>
          <div>
            <label className="block text-blue-700 font-semibold">Country</label>
            <p className="text-blue-900 flex items-center">
              <Shield className="mr-2 w-5 h-5 text-blue-500" />
              {user.country}
            </p>
          </div>
          <div>
            <label className="block text-blue-700 font-semibold">Email</label>
            <p className="text-blue-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-blue-700 font-semibold">Role Privileges</label>
            <div className="flex items-center">
              {user.role === 'Cool Kid' && (
                <p className="text-blue-900 flex items-center">
                  <UserCircle2 className="mr-2 w-5 h-5 text-blue-500" />
                  Basic Access: View Personal Profile
                </p>
              )}
              {user.role === 'Cooler Kid' && (
                <p className="text-green-900 flex items-center">
                  <Star className="mr-2 w-5 h-5 text-green-500" />
                  Can View User Names & Countries
                </p>
              )}
              {user.role === 'Coolest Kid' && (
                <p className="text-purple-900 flex items-center">
                  <Crown className="mr-2 w-5 h-5 text-purple-500" />
                  Full Access to User Details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;