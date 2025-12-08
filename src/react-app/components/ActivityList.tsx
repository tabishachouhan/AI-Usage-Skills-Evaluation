import { Edit2, Trash2, Clock } from 'lucide-react';
import { Activity } from '@/shared/types';

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

/**
 * Displays list of activities with edit and delete actions
 * Shows category-specific styling and formatting
 */
export default function ActivityList({ activities, onEdit, onDelete }: ActivityListProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Work: 'bg-blue-100 text-blue-700 border-blue-200',
      Study: 'bg-green-100 text-green-700 border-green-200',
      Sleep: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      Entertainment: 'bg-pink-100 text-pink-700 border-pink-200',
      Exercise: 'bg-orange-100 text-orange-700 border-orange-200',
      'Personal Care': 'bg-purple-100 text-purple-700 border-purple-200',
      Social: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Travel: 'bg-teal-100 text-teal-700 border-teal-200',
      Other: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[category] || colors.Other;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  };

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg truncate">
                {activity.name}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                    activity.category
                  )}`}
                >
                  {activity.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {formatDuration(activity.minutes)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(activity)}
                className="p-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                title="Edit activity"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(activity.id!)}
                className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Delete activity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
