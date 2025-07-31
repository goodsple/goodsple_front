import * as s from './SignUpStyle'

const LocationTerms = () => {

    return (
        <s.TermsContent>
            1. 위치정보의 수집 방법:  <br/>
            - 모바일 기기 또는 브라우저에서 제공하는 위치정보 시스템(GPS, Wi-Fi 등)을 통해 수집됩니다.<br/>
            2. 이용 목적:  <br/>
            - 내 주변의 교환글 표시, 사용자 간 거리 기반 매칭 기능 제공<br/>
            3. 보유 및 이용기간: <br/> 
            - 이용 목적 달성 후 즉시 파기함. 단, 관련 법령에 따라 일정 기간 보관할 수 있음.<br/>
            ※ 위치정보 수집을 원하지 않으실 경우, 기기 설정을 통해 위치 접근 권한을 차단할 수 있습니다.
        </s.TermsContent>
    )
}
export default LocationTerms;