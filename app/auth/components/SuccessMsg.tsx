interface Props {
  message?: string;
}

import React from 'react';

export default function SuccessMsg({ message }: Props) {
  if (!message) return null;

  return (
    <div className="bg-lime-300 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-lime-700">
      <p>{message}</p>
    </div>
  );
}
