import CSS from '../components/userCategory/userCategory.module.css'
import BasicComponents from '../components/usermain/BasicComponents.tsx';
import ive from '../assets/cateImages/ive.jpg'

function CategorySelect()
{
  return (
    <>
    <BasicComponents/>
    <div className={CSS.cateSelect}>
      <div className={CSS.secCategoryButtonWrap}>
        <label>
          <input type="radio" name="secCate" value={1} className={CSS.secCategoryButton} defaultChecked />
          <span>여성 그룹</span>
        </label>
        <label>
          <input type="radio" name="secCate" value={2} className={CSS.secCategoryButton} />
          <span>남성 그룹</span>
        </label>
        <label>
          <input type="radio" name="secCate" value={3} className={CSS.secCategoryButton} />
          <span>여성 솔로</span>
        </label>
        <label>
          <input type="radio" name="secCate" value={4} className={CSS.secCategoryButton} />
          <span>남성 솔로</span>
        </label>
      </div>
      <div className={CSS.thiCategoryWrap}>
        <div className={CSS.thiCategory}>
          <img src={ive}/>
          <p>아이브</p>
          <p>IVE</p>
        </div>
        <div className={CSS.thiCategory}>
          <img src={ive}/>
          <p>아이브</p>
          <p>IVE</p>
        </div>
        <div className={CSS.thiCategory}>
          <img src={ive}/>
          <p>아이브</p>
          <p>IVE</p>
        </div>
        <div className={CSS.thiCategory}>
          <img src={ive}/>
          <p>아이브</p>
          <p>IVE</p>
        </div>
        <div className={CSS.thiCategory}>
          <img src={ive}/>
          <p>아이브</p>
          <p>IVE</p>
        </div>
        <div className={CSS.thiCategory}>
          <img src={ive}/>
          <p>아이브</p>
          <p>IVE</p>
        </div>

      </div>

    </div>
    </>
  )
}

export default CategorySelect;