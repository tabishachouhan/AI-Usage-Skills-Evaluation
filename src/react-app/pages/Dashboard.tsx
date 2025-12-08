import { useState } from 'react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';
import Header from '@/react-app/components/Header';
import DatePicker from '@/react-app/components/DatePicker';
import ActivityForm from '@/react-app/components/ActivityForm';
import ActivityList from '@/react-app/components/ActivityList';
import AnalyticsButton from '@/react-app/components/AnalyticsButton';
import NoDataScreen from '@/react-app/components/NoDataScreen';
import AnalyticsDashboard from '@/react-app/components/AnalyticsDashboard';
import { useActivities } from '@/react-app/hooks/useActivities';
import { Activity } from '@/shared/types';
import { Loader2 } from 'lucide-react';

/**
 * Main dashboard page for authenticated users
 * Manages activity logging and analytics view switching
 */
export default function Dashboard() {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const {
    activities,
    isLoading,
    totalMinutes,
    remainingMinutes,
    createActivity,
    updateActivity,
    deleteActivity,
  } = useActivities(selectedDate);

  // Redirect if not authenticated
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    navigate('/');
    return null;
  }

  const handleAddActivity = () => {
    setEditingActivity(null);
    setShowForm(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (editingActivity) {
      await updateActivity(editingActivity.id!, data);
    } else {
      await createActivity(data);
    }
  };

  const handleDeleteActivity = async (id: number) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await deleteActivity(id);
    }
  };

  const handleAnalyze = () => {
    setShowAnalytics(true);
  };

  const handleBackToActivities = () => {
    setShowAnalytics(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

        <div className="mt-8">
          {showAnalytics ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <button
                  onClick={handleBackToActivities}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Activities
                </button>
              </div>
              <AnalyticsDashboard activities={activities} />
            </div>
          ) : (
            <>
              {/* Activity Management Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Activities</h2>
                    <p className="text-gray-600 mt-1">
                      {totalMinutes > 0 ? (
                        <>
                          {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m logged •{' '}
                          <span className={remainingMinutes < 0 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                            {remainingMinutes} minutes remaining
                          </span>
                        </>
                      ) : (
                        'No activities logged yet'
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleAddActivity}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Add Activity
                  </button>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                  </div>
                ) : activities.length > 0 ? (
                  <ActivityList
                    activities={activities}
                    onEdit={handleEditActivity}
                    onDelete={handleDeleteActivity}
                  />
                ) : (
                  <NoDataScreen date={selectedDate} onAddActivity={handleAddActivity} />
                )}
              </div>

              {/* Analytics Button */}
              {activities.length > 0 && (
                <AnalyticsButton
                  totalMinutes={totalMinutes}
                  activityCount={activities.length}
                  onClick={handleAnalyze}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Activity Form Modal */}
      {showForm && (
        <ActivityForm
          date={selectedDate}
          remainingMinutes={remainingMinutes}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
          editActivity={editingActivity}
        />
      )}
    </div>
  );
}
