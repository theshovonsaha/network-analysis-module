import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export function DevConsole({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='mt-4 border border-gray-800 rounded-lg overflow-hidden'
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full p-2 bg-gray-900 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300'
      >
        <Terminal className='w-4 h-4' />
        Developer Console
      </button>

      {isOpen && (
        <div className='p-4 bg-gray-950 font-mono text-sm overflow-x-auto'>
          <pre className='text-gray-300'>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </motion.div>
  );
}
