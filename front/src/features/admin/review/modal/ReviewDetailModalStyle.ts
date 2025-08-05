import styled,{css} from 'styled-components';

export const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

export const Dialog = styled.div`
    background: #fff;
    border-radius: 8px;
    width: 600px;
    max-width: 90%;
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
    display: flex; 
    flex-direction: column;
    overflow: hidden;
`;

export const Header = styled.div`
  position: relative;
  padding: 20px 25px 20px 30px;
  
  h3 { 
    margin: 0;
    font-size: 20px; 
    text-align: center; 
    }
`;

export const CloseButton = styled.img`
    position: absolute; 
    top: 20px; 
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const Body = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 12px; 
    column-gap: 24px;
    padding: 16px 24px;
`;

export const Field = styled.div`
    display: flex;
    align-items: center;
`;

export const FieldFull = styled.div<{ row?: boolean }>`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  gap: 12px;
`;

export const Label = styled.div`
    width: 100px; 
    font-weight: 500;
    white-space: nowrap;
    color: #444;
`;

export const Value = styled.div`
    flex: 1;
    color: #444;
    font-weight: 400;

    &.postTitle{
        margin-left: -10px;
    }
`;

export const Select = styled.select`
  flex: 1; 
  padding: 4px 8px;
  border: 1px solid #ccc; 
  border-radius: 4px;
`;

export const Separator = styled.div`
    grid-column: 1 / -1;
    height: 1px; 
    background: #eee;
    margin: 12px 0;
`;

export const ReviewContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const PhotoSliderWrapper = styled.div`
  position: relative;       
  width: 100%;
  height: 200px;
  overflow: visible;        
`;

export const LargePhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth; 
  border-radius: 10px;
  &::-webkit-scrollbar { display: none; }
`;

export const LargePhoto = styled.img`
  flex: 0 0 100%;
  height: 100%;
  object-fit: cover;
  scroll-snap-align: center;
`;

// 공통 화살표 스타일
const arrowCss = css<{ $disabled?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 2; 
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 0.8)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
            
  &:hover {
    opacity: 1;
  }
`;

export const NavArrowLeft = styled.img<{ $disabled?: boolean }>`
  ${arrowCss}
  left: 8px;
`;

export const NavArrowRight = styled.img<{ $disabled?: boolean }>`
  ${arrowCss}
  right: 8px;
`;

export const PageIndicatorOverlay = styled.div`
    position: absolute;     
    bottom: 8px;
    right: 8px;
    z-index: 3; 
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 12px;
    pointer-events: none;
`;

export const Content = styled.div`
  flex: 1;
  padding: 12px 0;
  border-radius: 4px;
  white-space: pre-wrap;
`;

export const Rating = styled.div`
  display: flex; 
  align-items: center;
`;

export const StarImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const Footer = styled.div`
    border-top: 1px solid #eee;
    padding: 24px;
    display: flex;
    justify-content: center;
    width: 504px;
    margin: auto;
`;

export const SaveButton = styled.button`
  padding: 10px 24px;
  background: ${({ disabled }) => (disabled ? '#D9D9D9' : '#997BEB')};
  color: #fff;
  border: none; border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  width: 150px;
`;
