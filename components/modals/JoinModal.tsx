// components/modals/JoinModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';
import JoinForm from '@/components/forms/joinform';

interface JoinModalProps {
  onClose: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Join IronPeak Fitness</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 md:p-8">
          <JoinForm />
        </div>
      </div>
    </div>
  );
};

export default JoinModal;