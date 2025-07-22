import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 80%;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-between;
`;
