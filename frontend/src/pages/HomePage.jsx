import React from 'react';
import { Link } from 'react-router-dom';
import { Network, UserPlus, LogIn } from 'lucide-react';

function HomePage() {
  return (
    <div className=" bg-slate-100 flex items-center justify-center px-4 py-8 no-scrollbar overflow-auto">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <Network className="w-16 h-16 text-emerald-600 mr-4" strokeWidth={2} />
            <h1 className="text-4xl font-bold text-slate-800">
              Cool Kids Network
            </h1>
          </div>
          
          <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
          Join the coolest community and discover your unique character!
          </p>
          
          <div className="flex justify-center space-x-6">
            <Link 
              to="/register" 
              className="flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg group"
            >
              <UserPlus className="mr-2 w-6 h-6 group-hover:animate-pulse" />
              Become a Cool Kid
            </Link>
            <Link 
              to="/login" 
              className="flex items-center px-8 py-4 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition shadow-lg group"
            >
              <LogIn className="mr-2 w-6 h-6 group-hover:animate-pulse" />
              Log In
            </Link>
          </div>
          
          <div className="mt-10 text-sm text-slate-500">
            <p>Join a community where creativity meets connection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;