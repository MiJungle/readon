import styled from "@emotion/styled";

const LayoutContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <ContentArea>{children}</ContentArea>
    </LayoutContainer>
  );
}
