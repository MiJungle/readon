import styled from '@emotion/styled';

export const PreviewContainer = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
  
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
`;

export const PreviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 16px;
  max-width: 400px;
`;

export const BookInfo = styled.div`
  flex: 1;
`;

export const StatusBadge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin: 8px 0;
`;

export const RatingDisplay = styled.div`
  font-size: 16px;
  color: #FFD700;
  margin: 8px 0;
  letter-spacing: 2px;
`;

export const QuoteItem = styled.div`
  margin: 8px 0;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #4A90E2;
`;