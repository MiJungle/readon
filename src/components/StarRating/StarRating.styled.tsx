import styled from "@emotion/styled";

export const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

export const StarButtonArea = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  display: inline-block;
`;

export const ClickArea = styled.button<{ half: "left" | "right" }>`
  position: absolute;
  top: 0;
  left: ${({ half }) => (half === "left" ? 0 : "50%")};
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  outline: none;
`;
