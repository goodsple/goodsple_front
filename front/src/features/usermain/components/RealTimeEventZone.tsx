import CSS from './UserMainComponents.module.css';
import EventZone from './EventZone.tsx';
import con from '../../../assets/eventImages/hoshiXwoozi.jpg';
import left from '../../../assets/eventImages/right.png';
import right from '../../../assets/eventImages/left.png';
import { useEffect, useState } from 'react';

interface EventZoneType {
    image: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
}

function RealTimeEventZone()
{
  const orders:EventZoneType[] = [
    {
      image: con,
      text1: "[Play＆Stay] HOSHI X WOOZI [WARNING]",
      text2: "2025.07.11 ~2025.07.13",
      text3: "잠실실내체육관",
      text4: "현재 거래존 활성화중!!"
    },
    {
      image: con,
      text1: "[Play＆Stay] HOSHI X WOOZI [WARNING]",
      text2: "2025.07.11 ~2025.07.13",
      text3: "잠실실내체육관",
      text4: "현재 거래존 활성화중!!2"
    },
    {
      image: con,
      text1: "[Play＆Stay] HOSHI X WOOZI [WARNING]",
      text2: "2025.07.11 ~2025.07.13",
      text3: "잠실실내체육관",
      text4: "현재 거래존 활성화중!!3"
    }
  ];

  const [ eventZones, setEventZones ] = useState<EventZoneType[]>(orders);

  const orderChangeRight = () => {
    setEventZones(prev => [prev[1], prev[2], prev[0]]);
  };

  const orderChangeLeft = () => {
    setEventZones(prev => [prev[2], prev[0], prev[1]]);
  };

  useEffect(() => {

  }, [eventZones[0]]);


  return (
    <div className={CSS.realTimePopularCate}>
      <div className={CSS.title}>
        이벤트존
      </div>
      <hr className={CSS.mainLine} />
      <div className={CSS.eventZoneWrap}>
        <EventZone order={eventZones[1]} num={0} />
        <button onClick={orderChangeLeft} className={CSS.eventZoneButton}><img src={left}/></button>
        <EventZone order={eventZones[0]} num={1}/>
        <button onClick={orderChangeRight} className={CSS.eventZoneButton}><img src={right}/></button>
        <EventZone order={eventZones[2]} num={2}/>
      </div>
    </div>
  )
}

export default RealTimeEventZone;