import CSS from './UserMainComponents.module.css';
import ive from '../../../assets/cateImages/ive.jpg';

function PopularCate() {
  return (<div className={CSS.cateWrap}>
      <div className={CSS.cateImgContainer}>
        <img className={CSS.cateImg} src={ive} />
      </div>
      <p className={CSS.cateFont1}>K-POP</p>
      <p className={CSS.cateFont2}>IVE</p>
    </div>

  );
}

export default PopularCate;