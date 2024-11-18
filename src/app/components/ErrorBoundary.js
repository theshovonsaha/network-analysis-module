'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-xl font-bold'>Something went wrong!</h2>
        <button
          onClick={reset}
          className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          Try again
        </button>
      </div>
    </div>
  );
}
