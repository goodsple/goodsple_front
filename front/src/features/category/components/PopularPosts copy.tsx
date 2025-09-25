import CSS from './userCategory.module.css';
import exampleImg from '../../../assets/AucImages/newJeansBag.jpg'
import queue_activated from '../../../assets/cateImages/queue_activated.png';
import bookmark_activated from '../../../assets/cateImages/bookmark_activated.png';


// 원본
function PopularPosts()
{
  return (
    <div className={CSS.popPostWrap}>
      <div className={CSS.popPost}>
        <img src={exampleImg} />
        <div className={CSS.popPostTextWrap}>
          <p className={CSS.popPostTitle}>뉴진스 포카 모음(일괄환...</p>
          <div className={CSS.popPostContWrap}>
            <p className={CSS.popPostContFont1}>06.26 뉴진스짱</p>
            <div className={CSS.popPostIcons}>
              <img src={queue_activated} />
              <p>3</p>
              <img src={bookmark_activated} />
            </div>
          </div>
        </div>
      </div>
      <div className={CSS.popPost}>
        <img src={exampleImg} />
        <div className={CSS.popPostTextWrap}>
          <p className={CSS.popPostTitle}>뉴진스 포카 모음(일괄환...</p>
          <div className={CSS.popPostContWrap}>
            <p className={CSS.popPostContFont1}>06.26 뉴진스짱</p>
            <div className={CSS.popPostIcons}>
              <img src={queue_activated} />
              <p>3</p>
              <img src={bookmark_activated} />
            </div>
          </div>
        </div>
      </div>
      <div className={CSS.popPost}>
        <img src={exampleImg} />
        <div className={CSS.popPostTextWrap}>
          <p className={CSS.popPostTitle}>뉴진스 포카 모음(일괄환...</p>
          <div className={CSS.popPostContWrap}>
            <p className={CSS.popPostContFont1}>06.26 뉴진스짱</p>
            <div className={CSS.popPostIcons}>
              <img src={queue_activated} />
              <p>3</p>
              <img src={bookmark_activated} />
            </div>
          </div>
        </div>
      </div>
      <div className={CSS.popPost}>
        <img src={exampleImg} />
        <div className={CSS.popPostTextWrap}>
          <p className={CSS.popPostTitle}>뉴진스 포카 모음(일괄환...</p>
          <div className={CSS.popPostContWrap}>
            <p className={CSS.popPostContFont1}>06.26 뉴진스짱</p>
            <div className={CSS.popPostIcons}>
            <img src={queue_activated} />
            <p>3</p>
            <img src={bookmark_activated} />
            </div>
          </div>
        </div>
      </div>
      <div className={CSS.popPost}>
        <img src={exampleImg} />
        <div className={CSS.popPostTextWrap}>
          <p className={CSS.popPostTitle}>뉴진스 포카 모음(일괄환...</p>
          <div className={CSS.popPostContWrap}>
            <p className={CSS.popPostContFont1}>06.26 뉴진스짱</p>
            <div className={CSS.popPostIcons}>
              <img src={queue_activated} />
              <p>3</p>
              <img src={bookmark_activated} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularPosts;