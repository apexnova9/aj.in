import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogOut, FileText, Settings, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts',
      icon: FileText,
      link: '/admin/blog'
    },
    {
      title: 'Profile Settings',
      description: 'Update your profile information',
      icon: User,
      link: '/admin/profile'
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings',
      icon: Settings,
      link: '/admin/settings'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Amit Jha</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen pt-[21px] bg-slate-50 dark:bg-[#011633]/50">
        <header className="bg-white dark:bg-[#022A5E]/10 border-b border-slate-200 dark:border-[#034694]/20">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/50 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="group p-6 bg-white dark:bg-[#022A5E]/5 rounded-lg border border-slate-200 dark:border-[#034694]/10 hover:border-[#022A5E]/20 dark:hover:border-[#034694]/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#022A5E]/5 dark:bg-[#034694]/10 rounded-lg flex items-center justify-center group-hover:bg-[#022A5E]/10 dark:group-hover:bg-[#034694]/20 transition-colors">
                    <item.icon className="w-5 h-5 text-[#022A5E] dark:text-blue-400" />
                  </div>
                  <h2 className="ml-3 text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
