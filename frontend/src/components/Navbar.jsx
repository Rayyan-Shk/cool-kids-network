import { Link, useLocation } from 'react-router-dom';
import { Network, User, LogOut } from 'lucide-react';

function Navbar({ user, onLogout }) {
  const location = useLocation();

  // Check if the current page is User List
  const isUserListPage = location.pathname === '/users';

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center space-x-3">
          <Network className="w-10 h-10 text-emerald-400" strokeWidth={2} />
          <span className="text-2xl font-semibold text-emerald-400 hover:text-emerald-300 transition">
            Cool Kids Network
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-md transition flex items-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md shadow-md transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Welcome, {user.firstName}</span>
              {(user.role === 'Cooler Kid' || user.role === 'Coolest Kid') && (
                <Link
                  to={isUserListPage ? '/' : '/users'}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-md transition flex items-center space-x-2"
                >
                  <Network className="w-5 h-5" />
                  <span>{isUserListPage ? 'Dashboard' : 'User List'}</span>
                </Link>
              )}
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md shadow-md transition flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;