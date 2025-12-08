import { useState, useEffect } from 'react';
import { X, Plus, Edit2 } from 'lucide-react';
import { ACTIVITY_CATEGORIES, CreateActivityInput, Activity } from '@/shared/types';

interface ActivityFormProps {
  date: string;
  remainingMinutes: number;
  onSubmit: (data: CreateActivityInput) => Promise<void>;
  onClose: () => void;
  editActivity?: Activity | null;
}

/**
 * Modal form for creating or editing activities
 * Includes validation and user-friendly error handling
 */
export default function ActivityForm({ 
  date, 
  remainingMinutes, 
  onSubmit, 
  onClose,
  editActivity 
}: ActivityFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(ACTIVITY_CATEGORIES[0]);
  const [minutes, setMinutes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (editActivity) {
      setName(editActivity.name);
      setCategory(editActivity.category);
      setMinutes(editActivity.minutes.toString());
    }
  }, [editActivity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const minutesNum = parseInt(minutes);
    
    // Validate duration
    if (isNaN(minutesNum) || minutesNum < 1) {
      setError('Duration must be at least 1 minute');
      return;
    }

    if (minutesNum > remainingMinutes && !editActivity) {
      setError(`Only ${remainingMinutes} minutes remaining for this day`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        date,
        name: name.trim(),
        category,
        minutes: minutesNum,
      });
      
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {editActivity ? (
                <Edit2 className="w-6 h-6 text-white" />
              ) : (
                <Plus className="w-6 h-6 text-white" />
              )}
              <h2 className="text-xl font-bold text-white">
                {editActivity ? 'Edit Activity' : 'Add Activity'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Activity Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., Morning workout"
              required
              maxLength={100}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {ACTIVITY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="60"
              required
              min="1"
              max="1440"
            />
            {!editActivity && (
              <p className="text-sm text-gray-500 mt-2">
                Remaining: {remainingMinutes} minutes
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : editActivity ? 'Update' : 'Add Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
