import { Activity } from '@/shared/types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, Activity as ActivityIcon, TrendingUp } from 'lucide-react';

interface AnalyticsDashboardProps {
  activities: Activity[];
}

/**
 * Analytics dashboard with visualizations
 * Shows pie chart for categories and bar chart for individual activities
 */
export default function AnalyticsDashboard({ activities }: AnalyticsDashboardProps) {
  // Calculate category totals
  const categoryData = activities.reduce((acc, activity) => {
    const existing = acc.find(item => item.category === activity.category);
    if (existing) {
      existing.minutes += activity.minutes;
    } else {
      acc.push({ category: activity.category, minutes: activity.minutes });
    }
    return acc;
  }, [] as { category: string; minutes: number }[]);

  // Prepare data for bar chart (individual activities)
  const activityData = activities.map(activity => ({
    name: activity.name.length > 20 ? activity.name.substring(0, 20) + '...' : activity.name,
    minutes: activity.minutes,
    hours: (activity.minutes / 60).toFixed(1),
  }));

  // Calculate totals
  const totalMinutes = activities.reduce((sum, activity) => sum + activity.minutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const activityCount = activities.length;

  // Colors for pie chart
  const COLORS = [
    '#6366f1', // indigo
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#3b82f6', // blue
    '#ef4444', // red
    '#14b8a6', // teal
    '#64748b', // slate
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6" />
            <h3 className="font-semibold">Total Time</h3>
          </div>
          <p className="text-3xl font-bold">
            {totalHours > 0 && `${totalHours}h `}
            {remainingMinutes}m
          </p>
          <p className="text-indigo-100 text-sm mt-1">{totalMinutes} minutes logged</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <ActivityIcon className="w-6 h-6" />
            <h3 className="font-semibold">Activities</h3>
          </div>
          <p className="text-3xl font-bold">{activityCount}</p>
          <p className="text-pink-100 text-sm mt-1">Total activities tracked</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <h3 className="font-semibold">Categories</h3>
          </div>
          <p className="text-3xl font-bold">{categoryData.length}</p>
          <p className="text-amber-100 text-sm mt-1">Different categories</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Categories */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Time by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="minutes"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.category}: ${formatDuration(entry.minutes)}`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatDuration(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Activities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Duration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value} minutes`, 'Duration']}
                labelFormatter={(label) => `Activity: ${label}`}
              />
              <Bar dataKey="minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Category Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryData
                .sort((a, b) => b.minutes - a.minutes)
                .map((item, index) => {
                  const percentage = ((item.minutes / totalMinutes) * 100).toFixed(1);
                  return (
                    <tr key={item.category} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium text-gray-900">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {formatDuration(item.minutes)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
