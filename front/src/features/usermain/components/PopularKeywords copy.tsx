import CSS from './UserMainComponents.module.css';

function PopularKeywords({ state }: { state: boolean }) {

  if (state === true) {
    return (<div className={CSS.popularKeywordsWrap}>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          1
        </div>
        <p className={CSS.keyword}>방탄 뷔 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          2
        </div>
        <p className={CSS.keyword}>엑소 백현 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          3
        </div>
        <p className={CSS.keyword}>포켓몬스터 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          4
        </div>
        <p className={CSS.keyword}>더보이즈 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          5
        </div>
        <p className={CSS.keyword}>에스파 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          6
        </div>
        <p className={CSS.keyword}>주술회전 랜덤 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          7
        </div>
        <p className={CSS.keyword}>두산 랜덤 배지</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          8
        </div>
        <p className={CSS.keyword}>뉴진스 포카</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          9
        </div>
        <p className={CSS.keyword}>피규어</p>
      </div>
      <div className={CSS.rank}>
        <div className={CSS.numBox}>
          10
        </div>
        <p className={CSS.keyword}>경수 포카</p>
      </div>

    </div>);

  } else {
    return null;
  }

}

export default PopularKeywords;