import { X } from 'lucide-react';
import { useState } from 'react';

const DevBadge = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      {/* Badge */}
      <button
        onClick={() => setShowMessage(!showMessage)}
        className="animate-pulse rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-lg transition hover:bg-yellow-600"
      >
        In Development
      </button>

      {showMessage && (
        <div
          className="absolute bottom-0 right-0 mt-2 flex w-64 justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          onClick={() => setShowMessage(false)}
          aria-hidden="true"
        >
          <p className="text-sm text-gray-700">
            This app is currently in development. Some features may be
            incomplete, and data may not be stored permanently. Please explore,
            but note that this is a work in progress!
          </p>
          <div className="size-5 hover:cursor-pointer">
            <X size={16} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DevBadge;
