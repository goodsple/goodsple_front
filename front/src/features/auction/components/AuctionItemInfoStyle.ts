import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
    
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #212529;
  flex-grow: 1;
  word-break: keep-all;
`;
    
export const ShareButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  background-color: #f1f1f1;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const DescriptionWrapper = styled.div`
  margin-top: 20px;
`;

export const DescriptionTitle = styled.h3`
  font-size: 20px;
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const DescriptionText = styled.p`
  line-height: 1.6;
  color: #495057;
`;

export const RulesButton = styled.button`
  margin-top: 15px;
  background: #e9ecef;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;