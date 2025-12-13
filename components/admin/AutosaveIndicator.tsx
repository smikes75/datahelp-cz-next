'use client';

/**
 * Indikator stavu autosave
 * Zobrazuje kdy bylo naposledy ulozeno a zda jsou neulozene zmeny
 */

import { Cloud, CloudOff, AlertCircle, RotateCcw } from 'lucide-react';

interface AutosaveIndicatorProps {
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  hasSavedData: boolean;
  onRestore?: () => void;
  onDiscard?: () => void;
}

export default function AutosaveIndicator({
  lastSaved,
  hasUnsavedChanges,
  hasSavedData,
  onRestore,
  onDiscard
}: AutosaveIndicatorProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show restore prompt if there's saved data but no unsaved changes (fresh load)
  if (hasSavedData && !lastSaved && onRestore) {
    return (
      <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-lg text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>Nalezen neuložený koncept</span>
        <button
          type="button"
          onClick={onRestore}
          className="ml-2 px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Obnovit
        </button>
        {onDiscard && (
          <button
            type="button"
            onClick={onDiscard}
            className="px-2 py-1 text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            Zahodit
          </button>
        )}
      </div>
    );
  }

  // Show unsaved changes indicator
  if (hasUnsavedChanges) {
    return (
      <div className="flex items-center gap-2 text-orange-600 text-sm">
        <CloudOff className="h-4 w-4" />
        <span>Neulozene zmeny</span>
      </div>
    );
  }

  // Show last saved time
  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <Cloud className="h-4 w-4" />
        <span>Ulozeno {formatTime(lastSaved)}</span>
      </div>
    );
  }

  return null;
}
