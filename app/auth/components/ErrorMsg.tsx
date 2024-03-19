import { AlertCircleIcon } from 'lucide-react';

interface Props {
  message?: string;
}

import React from 'react';

export default function ErrorMsg({ message }: Props) {
  if (!message) return null;

  return (
    <div className="bg-red-100 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-red-700">
      <AlertCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
