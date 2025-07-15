import * as er from './ErrorStyle'

const Error = () => {
    return (
      <er.ErrorContainer>
        <er.ErrorContent>
          <h1>페이지를 찾을 수 없습니다.</h1>
          <p>요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
          <button onClick={() => window.location.href = '/'}>메인으로 가기</button>
        </er.ErrorContent>
      </er.ErrorContainer>
    );
  };
  
  export default Error;