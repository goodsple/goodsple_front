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
          <img src={reply} />
          <p>3</p>
          <img src={view} />
          <p>123</p>
          <img src={bookmark} />
        </div>
      </div>
      <div className={CSS.titleLine} />
      <div className={CSS.vContent}>
        <p>어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁
          내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용</p>
        <p>어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁
          내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용</p>
        <p>어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁
          내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용</p>
        <p>어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁
          내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용어쩌구저쩌궁 내용</p>
        <div className={CSS.vContentImgs}>
        </div>
      </div>
      {/*<div className={CSS.vReport}>*/}
      {/*  <p></p>*/}
      {/*  신고하기*/}
      {/*  <p></p>*/}
      {/*</div>*/}
      <div className={CSS.titleLine} />
      <div className={CSS.vReply}>
        <div className={CSS.vReplyWrap}>
          <img src={reply} /> <p>댓글</p>
        </div>
        <div className={CSS.vReplyWrap}>
          <textarea className={CSS.replyInput} placeholder={'댓글 내용을 입력하세요'}></textarea>
          <div className={CSS.vReplyWrap2}>
            <label className={CSS.hiddenReply} id={'hidden'}><input className={CSS.hiddenReplyBox} type={'checkbox'}
                                                                    value={'hidden'} />비밀 댓글 등록하기</label>
            <button className={CSS.vReplyButton}>등록</button>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default EventZoneView;
