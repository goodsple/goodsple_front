import CSS from './eventzone.module.css';

function EventZoneView()
{
  return (
    <div className={CSS.boardCont}>
      <p className={CSS.popEventTitle}>
        이벤트존 글 상세보기
      </p>
      <div className={CSS.writeCont}>
        <div className={CSS.viewTitle}>
          <div className={CSS.eventName}>
            [WARNING] HOSHI X WOOZI
          </div>
        </div>
        <div className={CSS.titleLine}/>
      </div>
    </div>
  )
}

export default EventZoneView;
