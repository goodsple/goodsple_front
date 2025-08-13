import { useNavigate } from 'react-router-dom';
import megaPhone from '../../../assets/images/megaphone.png';
import * as s from './CommMegaPhoneBoxStyle.ts';

const CommMegaPhoneBox:React.FC = () => {

    const navigate = useNavigate();

    const handleCommunity = () => {
        navigate('/community');
    };

    return (
        <s.megaPhoneWrap>
            <img src={megaPhone} alt="확성기" />
            <p>
            K-POP 채팅방  =&gt; 엑소 포카 교환할 사람 구함!!!! 난 백현 포카 나옴~~~
            </p>
            <s.megaButton onClick={handleCommunity}>참여하기</s.megaButton>
      </s.megaPhoneWrap>
    )   
}


export default CommMegaPhoneBox;