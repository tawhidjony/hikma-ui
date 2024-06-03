
import { type UiButtonProps } from "./types";

const UiButton: React.FC<UiButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="px-3 inline-flex py-2 text-base font-normal rounded-md transition-all duration-500 ease-in-out text-white bg-gradient-to-r from-primary-500 to-primary-700 hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-800">
      {children}
    </button>
  );
};

export default UiButton;