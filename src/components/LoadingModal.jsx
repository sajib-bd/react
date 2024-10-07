import LoadingImage from "../assets/images/loading.gif";

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-transparent p-4 flex justify-center items-center">
        <img
          src={LoadingImage}
          alt="Loading..."
          className="w-24 h-24 rounded-xl"
        />
      </div>
    </div>
  );
};

export default LoadingModal;
