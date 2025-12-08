import { Calendar, Plus } from 'lucide-react';

interface NoDataScreenProps {
  date: string;
  onAddActivity: () => void;
}

/**
 * Empty state shown when no activities exist for selected date
 * Provides clear call-to-action to start logging
 */
export default function NoDataScreen({ date, onAddActivity }: NoDataScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-8">
          <Calendar className="w-16 h-16 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        No Activity Recorded
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Start tracking your day by adding activities. Build a complete picture of how you spend your time.
      </p>
      
      <button
        onClick={onAddActivity}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Start Logging Your Day
      </button>
    </div>
  );
}
