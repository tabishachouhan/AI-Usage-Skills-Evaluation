import { Clock, LogOut } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';

/**
 * Application header with branding and user menu
 */
export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TimeFlow
            </h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                {user.google_user_data.picture && (
                  <img
                    src={user.google_user_data.picture}
                    alt={user.google_user_data.name || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {user.google_user_data.name || user.email}
                  </p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
