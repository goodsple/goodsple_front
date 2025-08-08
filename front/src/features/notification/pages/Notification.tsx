import CSS from './../components/notification.module.css'
import expImg from '../../../assets/AucImages/newJeansBag.jpg'

function Notification() {

  const addKeyword = () => {

  }


  return(
    <div className={CSS.notification}>
      <div className={CSS.notificationTitle}>
        <p>뒤로가기</p>
        <p>내 알림</p>
      </div>
      <div className={CSS.notiKeywords}>
        <div className={CSS.notiKeywordsTitle}>
          <p>키워드 알림(최대 5개)</p>
        </div>
        <button onClick={addKeyword} className={CSS.notiKeywordsAdd}>╋</button>
      </div>
      <div className={CSS.notiWrap}>
        <div className={CSS.notiCont}>
          <p>읽지 않음</p>
          <img src={expImg} />
          <span>‘[뉴진스]포카 24종 판매’ 거래 요청이 수락되었습니다.</span>
          <button></button>
        </div>
        <div className={CSS.notiCont}>
          <p>읽지 않음</p>
          <img src={expImg} />
          <span>‘[뉴진스]포카 24종 판매’ 거래 요청이 수락되었습니다.</span>
          <button></button>
        </div>

      </div>
    </div>
  )
}

export default Notification;