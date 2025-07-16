
import CSS from './UserMainComponents.module.css';

function RealTimePopular()
{
    return (
        <div className={CSS.realTimePopularCate}>
            <div className={CSS.title}>
              실시간 인기
            </div>
              <hr className={CSS.mainLine}/>
            <div>
            </div>
        </div>
    )
}

export default RealTimePopular;