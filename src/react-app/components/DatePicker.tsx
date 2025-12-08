import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

/**
 * Date navigation component with previous/next day controls
 * Displays date in a user-friendly format
 */
export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const handlePrevDay = () => {
    const date = new Date(selectedDate);
    const prevDay = subDays(date, 1);
    onDateChange(format(prevDay, 'yyyy-MM-dd'));
  };

  const handleNextDay = () => {
    const date = new Date(selectedDate);
    const nextDay = addDays(date, 1);
    onDateChange(format(nextDay, 'yyyy-MM-dd'));
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  const displayDate = format(new Date(selectedDate), 'EEEE, MMMM d, yyyy');

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevDay}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
          title="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">{displayDate}</h2>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateInput}
            className="text-sm text-gray-500 border-0 bg-transparent cursor-pointer hover:text-indigo-600 transition-colors"
          />
        </div>

        <button
          onClick={handleNextDay}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
          title="Next day"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
