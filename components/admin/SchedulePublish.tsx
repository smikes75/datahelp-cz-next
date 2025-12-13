'use client';

/**
 * Komponenta pro planovane publikovani clanku
 * Umoznuje nastavit datum a cas kdy se clanek automaticky publikuje
 */

import { useState, useEffect } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

interface SchedulePublishProps {
  scheduledAt: string | null;
  onChange: (scheduledAt: string | null) => void;
  isPublished: boolean;
}

export default function SchedulePublish({
  scheduledAt,
  onChange,
  isPublished
}: SchedulePublishProps) {
  const [isScheduling, setIsScheduling] = useState(!!scheduledAt);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');

  // Parse existing scheduledAt value
  useEffect(() => {
    if (scheduledAt) {
      const dt = new Date(scheduledAt);
      setDate(dt.toISOString().split('T')[0]);
      setTime(dt.toTimeString().substring(0, 5));
      setIsScheduling(true);
    }
  }, [scheduledAt]);

  // Update parent when date/time changes
  useEffect(() => {
    if (isScheduling && date) {
      const dateTime = `${date}T${time}:00`;
      onChange(dateTime);
    } else if (!isScheduling) {
      onChange(null);
    }
  }, [isScheduling, date, time, onChange]);

  // Get minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  // Check if scheduled date is in the past
  const isInPast = scheduledAt && new Date(scheduledAt) < new Date();

  if (isPublished) {
    return null;
  }

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isScheduling}
          onChange={(e) => {
            setIsScheduling(e.target.checked);
            if (!e.target.checked) {
              onChange(null);
            } else {
              // Set default to tomorrow 9:00
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setDate(tomorrow.toISOString().split('T')[0]);
              setTime('09:00');
            }
          }}
          className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <span className="text-gray-700 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Naplanovat publikaci
        </span>
      </label>

      {isScheduling && (
        <div className="pl-8 space-y-3">
          <div className="flex gap-3">
            {/* Date picker */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Datum</label>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            {/* Time picker */}
            <div className="w-24">
              <label className="block text-sm text-gray-600 mb-1">Cas</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>

          {/* Schedule info */}
          {date && (
            <div className={`text-sm p-2 rounded ${
              isInPast
                ? 'bg-yellow-50 text-yellow-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {isInPast ? (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Planovany cas jiz uplynul - clanek bude publikovan okamzite
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Clanek bude publikovan {new Date(`${date}T${time}`).toLocaleString('cs-CZ', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              )}
            </div>
          )}

          {/* Cancel button */}
          <button
            type="button"
            onClick={() => {
              setIsScheduling(false);
              onChange(null);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Zrusit planovani
          </button>
        </div>
      )}
    </div>
  );
}
