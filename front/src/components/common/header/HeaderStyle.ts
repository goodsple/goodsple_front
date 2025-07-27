import styled from "styled-components";

interface IconBoxProps {
  $iconType: 'chat' | 'alarm';
}

interface ProfileWrapperProps {
  $isDefault: boolean;
}

export const HeaderContainer = styled.header`
    width: 100%;
    background: #FFFDFA;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    border-bottom: 1px solid #E5E5E5;
`
export const HeaderInner = styled.div`
    max-width: 1440px;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LeftArea = styled.div`
    width: 25%;
`;
export const CenterArea = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`;
export const RightArea = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-end;
    flex: 1;
`;

export const Logo = styled.img`
    height: 68px;
    object-fit: contain;
    cursor: pointer;
`;

export const HamburgerButton = styled.button<{ $open: boolean }>`
    width: 40px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;

  span {
    height: 4px;
    background: #444;
    transition: 0.3s;
    transform-origin: center;
  }

  ${({ $open }) =>
    $open &&
    `
    span:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }
  `}
`;

export const SignupButton = styled.button`
  background: #997BEB;
  border: none;
  border-radius: 5px;
  color : #fff;
  width: 120px;
  height: 42px;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  background: #fff;
  color: #997BEB;
  border: 1px solid #997BEB;
  border-radius: 5px;
  width:92px;
  height: 42px;
  cursor: pointer;
`;

export const IconBox = styled.div<IconBoxProps>`
  width:28px;
  height:28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
  }

    ${({ $iconType }) =>
    $iconType === 'chat' &&
    `
        margin-top: 2px;
    `}
    ${({ $iconType }) =>
    $iconType === 'alarm' &&
    `
    margin-left:15px;
    `}
`;

export const ProfileWrapper = styled.div<ProfileWrapperProps>`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${({ $isDefault }) => ($isDefault ? '#D9D9D9' : 'transparent')};
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-left: 15px;
    cursor: pointer;
`;

export const ProfileIcon = styled.img<{ $isDefault?: boolean }>`
    width: 90%;
    height: 90%;
    object-fit: contain;
    ${({ $isDefault }) => $isDefault && `
    transform: translateY(16%);
    opacity: 0.8;
  `}
}
`;

export const LogoutButton = styled.button`
    background: #997BEB;
    border: none;
    border-radius: 5px;
    color : #fff;
    width: 120px;
    height: 42px;
    margin-left: 10px;
    cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0; 
  width: 100%;
  height: 100vh;
  background-color: rgba(154, 154, 154, 0.6);
  z-index: 100;
`;
