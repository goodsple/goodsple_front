import CSS from './eventzone.module.css';
import reply from '../../../assets/eventImages/reply.png';
import view from '../../../assets/eventImages/view.png';
import bookmark from '../../../assets/cateImages/bookmark_deactivated.png';

function EventZoneView() {
  return (<div className={CSS.boardCont}>
      <p className={CSS.popEventTitle}>
        이벤트존 글 상세보기
      </p>
      <div className={CSS.viewCont}>
        <div className={CSS.viewTitle}>
          <div className={CSS.eventName}>
            [WARNING] HOSHI X WOOZI
          </div>
          <p className={CSS.nickName}>닉네임 공간</p>
          <p className={CSS.vTitle}>제목 공간</p>
          <div className={CSS.vEtc}>
            <p>2025.05.05 13:11</p>
            <img src={reply}/>
            <p>3</p>
            <img src={view}/>
            <p>123</p>
            <img src={bookmark}/>
          </div>
        </div>
        <div className={CSS.titleLine} />
        <div className={CSS.vContent}>
          <p>어쩌구저쩌궁 내용</p>
          <div className={CSS.vContentImgs}>
          </div>
        </div>
        <div className={CSS.vReport}>
          신고하기
        </div>
      </div>
    </div>);
}

export default EventZoneView;
