import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
        <p className="text-slate-500 dark:text-slate-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
