import { BarChart3, AlertCircle } from 'lucide-react';

interface AnalyticsButtonProps {
  totalMinutes: number;
  activityCount: number;
  onClick: () => void;
}

/**
 * Action button to navigate to analytics dashboard
 * Shows validation status and remaining minutes
 */
export default function AnalyticsButton({ 
  totalMinutes, 
  activityCount,
  onClick 
}: AnalyticsButtonProps) {
  const isValid = totalMinutes <= 1440 && activityCount > 0;
  const remainingMinutes = 1440 - totalMinutes;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            Ready to analyze?
          </h3>
          <p className="text-sm text-gray-600">
            {activityCount === 0 ? (
              'Add activities to view analytics'
            ) : totalMinutes > 1440 ? (
              <span className="flex items-center gap-1.5 text-red-600">
                <AlertCircle className="w-4 h-4" />
                Exceeds 24 hours by {totalMinutes - 1440} minutes
              </span>
            ) : (
              `${remainingMinutes} minutes remaining`
            )}
          </p>
        </div>
        
        <button
          onClick={onClick}
          disabled={!isValid}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 shadow-lg hover:shadow-xl"
        >
          <BarChart3 className="w-5 h-5" />
          Analyze
        </button>
      </div>
    </div>
  );
}
