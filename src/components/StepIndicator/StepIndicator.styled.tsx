import styled from '@emotion/styled';

export const StepIndicatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  padding: 0 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e5e7eb;
    z-index: 1;
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const StepNumber = styled.div<{ isActive?: boolean; isCurrent?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => 
    props.isCurrent ? '#1d4ed8' : 
    props.isActive ? '#3b82f6' : '#e5e7eb'
  };
  color: ${props => 
    props.isCurrent || props.isActive ? 'white' : '#9ca3af'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  border: 2px solid ${props => 
    props.isCurrent ? '#1d4ed8' : 
    props.isActive ? '#3b82f6' : '#e5e7eb'
  };
  box-shadow: ${props => 
    props.isCurrent ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none'
  };
`;

