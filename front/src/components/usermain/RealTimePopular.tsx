
import CSS from './UserMainComponents.module.css';
import PopularCate from './PopularCate.tsx';

function RealTimePopular()
{
    return (
        <div className={CSS.realTimePopularCate}>
            <div className={CSS.title}>
              실시간 인기
            </div>
              <hr className={CSS.mainLine}/>
            <div className={CSS.popularCateWrap}>
              <PopularCate/>
              <PopularCate/>
              <PopularCate/>
              <PopularCate/>
            </div>
        </div>
    )
}


export default RealTimePopular;