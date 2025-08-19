import RealTimePopular from '../components/RealTimePopular.tsx';
import BasicComponents from '../components/BasicComponents.tsx';
import RealTimeEventZone from '../components/RealTimeEventZone.tsx';
import CurrentAuction from '../components/CurrentAuction.tsx';
import BestPost from '../components/BestPost.tsx';
import PopupNotice from '../../notice/PopupNotice.tsx';

function UserMain() {
  return (<>
      <PopupNotice />
      <BasicComponents />
      <RealTimePopular />
      <RealTimeEventZone />
      <CurrentAuction />
      <BestPost />
    </>);
}

export default UserMain;