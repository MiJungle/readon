import styled from "@emotion/styled";

export const AutoCompleteList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  border: 1px solid #ddd;
  position: absolute;
  width: 100%;
  background: #fff;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
`;

export const AutoCompleteItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &.error {
    border-color: #ef4444;
  }
`;
