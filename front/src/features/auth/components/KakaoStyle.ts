import styled from "styled-components";
import * as s from "./SignUpStyle";

export const KakaoInfoGuide = styled.p`
  font-size: 16px;
  font-weight: normal;
  margin-top: 40px;
  margin-bottom: 50px;
  line-height: 1.5;
  text-align: center;
`;

export const ReadOnlyInput = styled(s.SignUpInput)`
  background: #f5f5f5;
  cursor: not-allowed;
  color: #999;
`;