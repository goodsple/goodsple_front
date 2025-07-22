import CSS from './UserMainComponents.module.css';

interface EventZoneType {
  image: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}

function EventZone({ order, num }: { order: EventZoneType, num: number }) {

  if (num === 1) {
    return (
      <div className={CSS.num1Wrap}>
        <div className={CSS.eventZoneWrap1}>
          <img src={order.image}/>
        </div>
        <div className={CSS.eventZoneDesc}>
          <p className={CSS.eTitle}>{order.text1}</p>
          <div className={CSS.eWrap1}>
            <div className={CSS.eWrap2}>
              <p className={CSS.eDateLoc}>{order.text2}</p>
              <p className={CSS.eDateLoc}>{order.text3}</p>
            </div>
          <p className={CSS.eText}>{order.text4}</p>
          </div>
        </div>
      </div>);
  } else {
    return (
      <div className={CSS.eventZoneWrap2}>
        <img src={order.image} />
      </div>);
  }

}

export default EventZone;