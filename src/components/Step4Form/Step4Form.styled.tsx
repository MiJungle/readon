import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import styled from "@emotion/styled";

export const QuoteWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const QuoteInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const PageInput = styled.input`
  width: 120px;
  padding: 6px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 8px;
  height: 32px;
  cursor: pointer;
  margin-left: 8px;
`;

export const AddButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

export const TotalPageInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const Box = styled.div`
  margin-top: 20px;
`;
