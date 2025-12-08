import { useState, useEffect } from 'react';
import { Activity, CreateActivityInput, UpdateActivityInput } from '@/shared/types';

/**
 * Custom hook for managing activities for a specific date
 * Provides CRUD operations and loading states
 */
export function useActivities(date: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch activities for the selected date
  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/activities/${date}`);
      if (!response.ok) throw new Error('Failed to fetch activities');
      
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new activity
  const createActivity = async (input: CreateActivityInput): Promise<void> => {
    const response = await fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create activity');
    }

    await fetchActivities();
  };

  // Update an existing activity
  const updateActivity = async (id: number, input: UpdateActivityInput): Promise<void> => {
    const response = await fetch(`/api/activities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to update activity');
    }

    await fetchActivities();
  };

  // Delete an activity
  const deleteActivity = async (id: number): Promise<void> => {
    const response = await fetch(`/api/activities/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to delete activity');
    }

    await fetchActivities();
  };

  // Calculate total minutes used for the day
  const totalMinutes = activities.reduce((sum, activity) => sum + activity.minutes, 0);
  const remainingMinutes = 1440 - totalMinutes;

  // Refetch when date changes
  useEffect(() => {
    fetchActivities();
  }, [date]);

  return {
    activities,
    isLoading,
    error,
    totalMinutes,
    remainingMinutes,
    createActivity,
    updateActivity,
    deleteActivity,
    refetch: fetchActivities,
  };
}
