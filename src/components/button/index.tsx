
import { type UiButtonProps } from "./types";

const UiButton: React.FC<UiButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="bg-primary-500">
      {children}
    </button>
  );
};

export default UiButton;