import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Amit Jha</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center -mt-32 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-5">
          <div>
            <div className="mx-auto h-12 w-12 bg-gradient-to-br from-[#022A5E] to-[#034694] rounded-lg flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-3 text-center text-3xl font-bold text-slate-900 dark:text-white">
              Admin Login
            </h2>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 
                    placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-md 
                    focus:outline-none focus:ring-[#022A5E] focus:border-[#022A5E] dark:focus:ring-[#034694] dark:focus:border-[#034694]
                    focus:z-10 sm:text-sm bg-white dark:bg-slate-800"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 
                    placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-md 
                    focus:outline-none focus:ring-[#022A5E] focus:border-[#022A5E] dark:focus:ring-[#034694] dark:focus:border-[#034694]
                    focus:z-10 sm:text-sm bg-white dark:bg-slate-800"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
                  rounded-md text-white bg-gradient-to-r from-[#022A5E] to-[#034694] hover:from-[#022A5E]/90 hover:to-[#034694]/90
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022A5E] disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-300"
              >
                {isLoading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </span>
                ) : null}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
