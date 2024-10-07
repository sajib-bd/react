const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-transparent p-4 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-lg z-10 border px-[5px] rounded-full bg-white"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
