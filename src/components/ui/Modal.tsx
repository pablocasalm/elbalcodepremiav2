import React, { useEffect } from 'react';
import { FaReact } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  success: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, success, title, message, onClose }) => {
  // Cierra automáticamente después de 5s
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-5xl mb-4" style={{ color: success ? '#61dafb' : '#f56565' }}>
          <FaReact />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-gray-700 mb-4">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Modal;