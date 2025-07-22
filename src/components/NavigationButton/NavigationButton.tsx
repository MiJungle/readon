import {
  Button,
  ButtonWrapper,
} from "./NavigationButton.styled";

interface NavigationButtonProps {
  showNextButton: boolean;
  showPrevButton: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function NavigationButton({
  showNextButton,
  showPrevButton,
  onNextClick,
  onPrevClick,
}: NavigationButtonProps) {
  return (
    <ButtonWrapper>
      <Button
        type="button"
        onClick={onPrevClick}
        style={{ visibility: showPrevButton ? "visible" : "hidden" }}>
        이전
      </Button>
      <Button
        type="submit"
        onClick={onNextClick}
        style={{ visibility: showNextButton ? "visible" : "hidden" }}>
        다음
      </Button>
    </ButtonWrapper>
  );
}
