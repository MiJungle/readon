import React from 'react';
import { useAtom } from 'jotai';
import { bookFormDataAtom } from '@/atoms/bookFormData';
import { PreviewContainer, PreviewCard, BookInfo, StatusBadge, RatingDisplay, QuoteItem } from './Preview.styled';

export default function Preview() {
  const [bookFormData] = useAtom(bookFormDataAtom);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'want-to-read': return '읽고 싶은 책';
      case 'reading': return '읽는 중';
      case 'completed': return '완독';
      case 'paused': return '보류 중';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'want-to-read': return '#4A90E2';
      case 'reading': return '#F5A623';
      case 'completed': return '#7ED321';
      case 'paused': return '#D0021B';
      default: return '#9B9B9B';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const renderRating = (rating: string) => {
    if (!rating) return null;
    const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
    return <RatingDisplay>{stars}</RatingDisplay>;
  };

  return (
    <PreviewContainer>
      <h3>실시간 미리보기</h3>
      <PreviewCard>
        <BookInfo>
          {bookFormData.title && (
            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
              {bookFormData.title}
            </h4>
          )}
          
          {bookFormData.author && (
            <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
              {bookFormData.author}
            </p>
          )}

          {bookFormData.status && (
            <StatusBadge color={getStatusColor(bookFormData.status)}>
              {getStatusText(bookFormData.status)}
            </StatusBadge>
          )}

          {bookFormData.startDate && (
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#999' }}>
              시작: {formatDate(bookFormData.startDate)}
            </p>
          )}
          
          {bookFormData.endDate && (
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#999' }}>
              완독: {formatDate(bookFormData.endDate)}
            </p>
          )}

          {bookFormData.rating && renderRating(bookFormData.rating)}

          {bookFormData.recommend && (
            <p style={{ 
              margin: '8px 0', 
              fontSize: '14px', 
              color: bookFormData.recommend === 'yes' ? '#7ED321' : '#D0021B',
              fontWeight: 'bold'
            }}>
              {bookFormData.recommend === 'yes' ? '👍 추천합니다' : '👎 추천하지 않습니다'}
            </p>
          )}

          {bookFormData.review && (
            <div style={{ margin: '12px 0' }}>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.5', 
                color: '#333',
                margin: '0',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {bookFormData.review}
              </p>
            </div>
          )}

          {bookFormData.quotes && bookFormData.quotes.length > 0 && (
            <div style={{ margin: '12px 0' }}>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                인용구 ({bookFormData.quotes.length}개)
              </h5>
              {bookFormData.quotes.slice(0, 2).map((quote, index) => (
                <QuoteItem key={index}>
                  <p style={{ 
                    fontSize: '12px', 
                    fontStyle: 'italic', 
                    color: '#666',
                    margin: '0 0 4px 0'
                  }}>
                    "{quote.text}"
                  </p>
                  <span style={{ fontSize: '11px', color: '#999' }}>
                    p.{quote.page}
                  </span>
                </QuoteItem>
              ))}
            </div>
          )}

          {bookFormData.totalPages && (
            <p style={{ margin: '8px 0', fontSize: '12px', color: '#999' }}>
              총 {bookFormData.totalPages}페이지
            </p>
          )}

          {bookFormData.share && (
            <div style={{ 
              margin: '12px 0', 
              padding: '8px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              fontSize: '12px',
              color: '#666'
            }}>
              공유 설정: {
                bookFormData.share === 'public' ? '전체 공개' :
                bookFormData.share === 'follower' ? '팔로워만' :
                bookFormData.share === 'private' ? '비공개' : ''
              }
            </div>
          )}
        </BookInfo>
      </PreviewCard>
    </PreviewContainer>
  );
}