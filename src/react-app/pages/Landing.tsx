import { Clock, BarChart3, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';

/**
 * Landing page shown to non-authenticated users
 * Features hero section with value proposition and Google login
 */
export default function Landing() {
  const { redirectToLogin } = useAuth();

  const handleLogin = async () => {
    await redirectToLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TimeFlow
            </h1>
          </div>
          <button
            onClick={handleLogin}
            className="px-6 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:shadow-lg transition-all border border-indigo-200"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-indigo-200 text-sm font-medium text-indigo-700 mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Track • Analyze • Optimize
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Master Your Day
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              One Activity at a Time
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your daily activities, visualize how you spend your time, and gain insights to optimize your productivity and well-being.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Activity Logging</h3>
              <p className="text-gray-600">
                Quickly log your daily activities with categories, durations, and automatic time validation.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Beautiful Analytics</h3>
              <p className="text-gray-600">
                Visualize your time with interactive charts and detailed breakdowns by category.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24-Hour Validation</h3>
              <p className="text-gray-600">
                Ensures your daily activities never exceed 24 hours with real-time remaining minutes tracking.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Built with Mocha • Powered by Cloudflare</p>
      </footer>
    </div>
  );
}
