import * as s from "./CateButtonsStyle";

const CateButtons: React.FC = () => {
  return (
    <s.ButtonWrap>
      <s.CateButton>K-POP</s.CateButton>
      <s.CateButton>애니메이션</s.CateButton>
      <s.CateButton>영화/드라마</s.CateButton>
      <s.CateButton>게임</s.CateButton>
    </s.ButtonWrap>
  );
};

export default CateButtons;
