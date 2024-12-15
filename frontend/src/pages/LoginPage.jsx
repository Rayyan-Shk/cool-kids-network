import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, Mail } from 'lucide-react';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', { 
        email,
        firstName: '', 
        lastName: '',  
        country: ''    
      });

      // Destructure response with default fallbacks
      const { 
        token, 
        firstName = '', 
        lastName = '', 
        country = '',
        ...otherUserData 
      } = response.data;

      // Store full user data
      const userData = {
        email,
        firstName,
        lastName,
        country,
        ...otherUserData
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLogin(userData);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <div className="flex items-center justify-center mb-6">
            <LogIn className="w-12 h-12 text-emerald-600 mr-3" />
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-slate-700 mb-2 items-center">
                <Mail className="w-5 h-5 mr-2 text-emerald-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition duration-300 ${
                isLoading 
                  ? 'bg-emerald-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 w-5 h-5" />
                  Log In
                </>
              )}
            </button>
          </form>

          <div className="text-sm text-slate-600 mt-6 text-center">
            <p>Don't have an account? <a href="/register" className="text-emerald-600 hover:text-emerald-700 transition">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;