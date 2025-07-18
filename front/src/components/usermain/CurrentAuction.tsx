import CSS from './UserMainComponents.module.css';
import bag from '../../assets/AucImages/newJeansBag.jpg'

function CurrentAuction()
{
  return (
    <div className={CSS.currentAuction}>
      <img src={bag}/>
      <div className={CSS.currentAuctionRight}>
        <p className={CSS.prTitle}>현재 진행중인 경매</p>
        <p className={CSS.prName}>NEW JEANS 1st EP ‘NEW JEANS’ BAG </p>
        <div className={CSS.prTextWrap}>
          <div className={CSS.prText1Wrap}>
            <p>시작가</p>
            <p>현재 입찰가</p>
            <p>남은 시간</p>
          </div>
          <div className={CSS.prText2Wrap}>
            <p>50,000~</p>
            <div className={CSS.currentBidBox}>
            <p className={CSS.currentBid}>85,320</p>
            </div>
            <p>01:20~</p>
          </div>
        </div>
        <button className={CSS.auctionButton}>참여하기</button>
      </div>
    </div>
  )
}

export default CurrentAuction;