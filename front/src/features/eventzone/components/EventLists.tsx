import CSS from './eventzone.module.css';
import example from '../../../assets/eventImages/hoshiXwoozi.jpg';

function EventLists() {
  return (<div className={CSS.eventZoneListCont}>
    <div className={CSS.popEventZoneWrap}>
      <p className={CSS.popEventTitle}>인기 이벤트존</p>
      <div className={CSS.popEventsWrap}>
        <div className={CSS.popEventWrap}>
          <img src={example} />
          <p>[WARNING] HOSHI X WOOZI</p>
        </div>
        <div className={CSS.popEventWrap}>
          <img src={example} />
          <p>[WARNING] HOSHI X WOOZI</p>
        </div>
      </div>
    </div>
    <div className={CSS.allEventZoneWrap}>
      <p className={CSS.popEventTitle}>전체보기</p>
      <div className={CSS.contHeight}>

        <div className={CSS.eventZoneWrap}>
          <div className={CSS.firstCate}>K-POP</div>
          <div className={CSS.dateRange}>2025.06-2025.08</div>
          <p>ENHYPEN WORLD TOUR ‘WALK THE LINE’ IN JAPAN</p>
        </div>
        <div className={CSS.eventZoneWrap}>
          <div className={CSS.firstCate}>K-POP</div>
          <div className={CSS.dateRange}>2025.06-2025.08</div>
          <p>ENHYPEN WORLD TOUR ‘WALK THE LINE’ IN JAPAN</p>
        </div>
        <div className={CSS.eventZoneWrap}>
          <div className={CSS.firstCate}>K-POP</div>
          <div className={CSS.dateRange}>2025.06-2025.08</div>
          <p>ENHYPEN WORLD TOUR ‘WALK THE LINE’ IN JAPAN</p>
        </div>
        <div className={CSS.eventZoneWrap}>
          <div className={CSS.firstCate}>K-POP</div>
          <div className={CSS.dateRange}>2025.06-2025.08</div>
          <p>ENHYPEN WORLD TOUR ‘WALK THE LINE’ IN JAPAN</p>
        </div>
        <div className={CSS.eventZoneWrap}>
          <div className={CSS.firstCate}>K-POP</div>
          <div className={CSS.dateRange}>2025.06-2025.08</div>
          <p>ENHYPEN WORLD TOUR ‘WALK THE LINE’ IN JAPAN</p>
        </div>
        <div className={CSS.eventZoneWrap}>
          <div className={CSS.firstCate}>K-POP</div>
          <div className={CSS.dateRange}>2025.06-2025.08</div>
          <p>ENHYPEN WORLD TOUR ‘WALK THE LINE’ IN JAPAN</p>
        </div>
      </div>
    </div>
  </div>);
}

export default EventLists;