import CSS from './UserMainComponents.module.css';
import bag from '../../assets/AucImages/newJeansBag.jpg'


function BestPost()
{
  return(
    <div className={CSS.bestPost}>
      <div className={CSS.bestPostTitle}>
        <div className={CSS.bestPostTitleBox}>
        </div>
        <p className={CSS.bestPostText}>Best Post</p>
        <div className={CSS.bestPostContentText}>
          <p>[K-POP]SM 30주년 기념 MP3 플레이...</p>
          <p>[K-POP]EXO 엑소 공식응원봉 [VER 3.0]</p>
          <p>[K-POP]세븐틴(SEVENTEEN) - 5th A...</p>
          <p>[K-POP]SM 30주년 기념 MP3 플레이...</p>
          <p>[K-POP]SM 30주년 기념 MP3 플레이...</p>
          <p>[K-POP]SM 30주년 기념 MP3 플레이...</p>
        </div>
      </div>

      <div className={CSS.bestPostContentScroll}>
        <img src={bag}/>
        <img src={bag}/>
        <img src={bag}/>
        <img src={bag}/>
        <img src={bag}/>
        <img src={bag}/>
      </div>
    </div>
  )
}

export default BestPost;