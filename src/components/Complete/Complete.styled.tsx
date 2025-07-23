import styled from "@emotion/styled";

export const CompletionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 500px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
  
  ${({ variant }) =>
    variant === "primary"
      ? `
        background-color: #3b82f6;
        color: white;
        &:hover {
          background-color: #2563eb;
        }
      `
      : `
        background-color: #f3f4f6;
        color: #374151;
        &:hover {
          background-color: #e5e7eb;
        }
      `}
`;