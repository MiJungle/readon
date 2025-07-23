import {
  CompletionContainer,
  Title,
  Message,
  ButtonGroup,
  Button,
} from "./Complete.styled";

export default function CompletionPage() {

  const handleNewReview = () => {
    window.location.href = "/book-review/step-1";
  };

  return (
    <CompletionContainer>
      <Title>제출이 완료되었습니다!</Title>

      <Message>
        북리뷰가 성공적으로 등록되었습니다. 다른 독자들과 함께 책에 대한
        이야기를 나누어보세요.
      </Message>

      <ButtonGroup>
        <Button variant="primary" onClick={handleNewReview}>
          새로운 리뷰 작성
        </Button>
      </ButtonGroup>
    </CompletionContainer>
  );
}
