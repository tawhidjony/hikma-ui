
import { ButtonStyle } from "./styled";
import { type UiButtonProps } from "./types";

const UiButton: React.FC<UiButtonProps> = ({ onClick, children }) => {
  return (
    <ButtonStyle onClick={onClick} data-testid="page-container">
      {children}
    </ButtonStyle>
  );
};

export default UiButton;