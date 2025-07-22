import RealTimePopular from '../components/RealTimePopular.tsx';
import BasicComponents from '../components/BasicComponents.tsx';
import RealTimeEventZone from '../components/RealTimeEventZone.tsx';
import CurrentAuction from '../components/CurrentAuction.tsx';
import BestPost from '../components/BestPost.tsx';

function UserMain() {
  return (<>
      <BasicComponents />
      <RealTimePopular />
      <RealTimeEventZone />
      <CurrentAuction />
      <BestPost />
    </>);
}

export default UserMain;