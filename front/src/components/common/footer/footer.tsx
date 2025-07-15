import * as style from './FooterStyle';
import logoImg from '../../../assets/images/logo.png';
import githubImg from '../../../assets/images/github.png';
import notionImg from '../../../assets/images/Notion.png';

function Footer(){
    return(
        <style.FooterContainer>
        <style.FooterInner>
            <style.FooterLeft>
                <style.FooterLogo src={logoImg}/>
                <span>모든 팬덤의 굿즈가 흐르는 곳, 굿즈플</span>
                <span>© 2025 GoodsPle. All rights reserved.</span>
            </style.FooterLeft>
            <style.FooterRight>
                <style.SectionTitle>CONTACT</style.SectionTitle>
                <style.ContactList>
                    <li>정예인<span>yein181677@naver.com</span></li>
                    <li>최완수<span>ys615098@naver.com</span></li>
                    <li>홍성경<span>hsg200528@gmail.com</span></li>
                    <li>진보경<span>qhrud4231@naver.com</span></li>
                    <li>조수민<span>tnals030927@gmail.com</span></li>
                </style.ContactList>
                <style.SectionTitle>협업도구</style.SectionTitle>
                <style.ToolBox>
                    <style.ToolList>
                    <li><img src={githubImg} alt="깃허브 로고" /></li>
                    <li><img src={notionImg} alt="노션 로고" /></li>
                    </style.ToolList>
                    <style.ToolDescription>
                    이 프로젝트는 팀 프로젝트로 운영됩니다.<br />
                    문의 및 문서는 협업 도구에서 확인해주세요.
                    </style.ToolDescription>
                </style.ToolBox>
            </style.FooterRight>
        </style.FooterInner>
    </style.FooterContainer>
    )
   
}
export default Footer;