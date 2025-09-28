import CSS from './userCategory.module.css';
import exampleImg from '../../../assets/AucImages/newJeansBag.jpg';
import queue_activated from '../../../assets/cateImages/queue_activated.png';
import bookmark_activated from '../../../assets/cateImages/bookmark_activated.png';

const posts = [
  { title: '뉴진스 포카 모음(일괄환...', date: '06.26', writer: '뉴진스짱', views: 3 },
  { title: '뉴진스 포카 모음(일괄환...', date: '06.26', writer: '뉴진스짱', views: 3 },
  { title: '뉴진스 포카 모음(일괄환...', date: '06.26', writer: '뉴진스짱', views: 3 },
  { title: '뉴진스 포카 모음(일괄환...', date: '06.26', writer: '뉴진스짱', views: 3 },
  { title: '뉴진스 포카 모음(일괄환...', date: '06.26', writer: '뉴진스짱', views: 3 },
];

function PopularPosts() {
  return (
    <div className={CSS.popPostWrap}>
      {posts.map((post, idx) => (
        <div className={CSS.popPost} key={idx}>
          <img src={exampleImg} alt="포스트 이미지" />
          <div className={CSS.popPostTextWrap}>
            <p className={CSS.popPostTitle}>{post.title}</p>
            <div className={CSS.popPostContWrap}>
              <p className={CSS.popPostContFont1}>{`${post.date} ${post.writer}`}</p>
              <div className={CSS.popPostIcons}>
                <img src={queue_activated} alt="조회수" />
                <p>{post.views}</p>
                <img src={bookmark_activated} alt="찜하기" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopularPosts;
