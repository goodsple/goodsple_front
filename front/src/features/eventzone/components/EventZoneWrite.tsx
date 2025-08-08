import CSS from './eventzone.module.css';

function EventZoneWrite()
{
  return (
    <div className={CSS.boardCont}>
      <p className={CSS.popEventTitle}>
        이벤트존 글 작성
      </p>
      <div className={CSS.buttonWrap}>
        <button className={CSS.button}>파일첨부</button>
        <button className={CSS.button}>임시저장</button>
        <button className={CSS.button}>작성완료</button>
      </div>
      <div className={CSS.writeCont}>
        <div className={CSS.titleWrap}>
          <input className={CSS.title} type={'text'} placeholder={'제목을 입력하세요'}/>
          <select className={CSS.eventZoneSelect} name={'events'} id={'events'}>
            <option className={CSS.eventZoneOption} value={'events1'} selected>events1events1events1</option>
            <option className={CSS.eventZoneOption} value={'events2'} >events2events2</option>
            <option className={CSS.eventZoneOption} value={'events3'} >events3</option>
            <option className={CSS.eventZoneOption} value={'events4'} >events4</option>
            <option className={CSS.eventZoneOption} value={'events5'} >events5</option>
          </select>
        </div>
        <div className={CSS.titleLine}/>
        <textarea className={CSS.content} placeholder={'내용을 입력하세요'}/>
        <div className={CSS.titleLine}/>
        <div className={CSS.photoBox}></div>
      </div>
    </div>
  )
}

export default EventZoneWrite;