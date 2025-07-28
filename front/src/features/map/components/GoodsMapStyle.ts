import styled from 'styled-components';

export const MapContainer = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
`;

export const ResearchButton = styled.button`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 10px 20px;
  background-color: #997BEB;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

export const InfoWindow = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  padding: 12px;
  width: 240px;
`;

export const InfoHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const InfoClose = styled.span`
  cursor: pointer;
  font-size: 14px;
  color: #888;
`;

export const InfoBody = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 80px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 12px;
  }
`;

export const InfoContent = styled.div`
  .info-title { font-size: 16px; font-weight: bold; color: #444; margin-bottom: 4px; }
  .info-price { font-size: 14px; color: #997BEB; font-weight: 500; margin-bottom: 10px; }
  a { font-size: 13px; color: #666; text-decoration: underline; }
`;

export const MultiInfoWindow = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  width: 280px;
  overflow: hidden;
`;

export const MultiInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  font-weight: bold;
  font-size: 15px;
  border-bottom: 1px solid #e9ecef;
`;

export const MultiItemList = styled.ul`
  list-style: none; margin: 0; padding: 0;
  max-height: 200px; overflow-y: auto;
  -ms-overflow-style: none; scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  .multi-item {
    display: flex; align-items: center; padding: 12px 16px;
    border-bottom: 1px solid #f1f3f5; cursor: pointer;
    &:last-child { border-bottom: none; }
    &:hover { background-color: #f8f9fa; }
    img { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 12px; }
  }
`;